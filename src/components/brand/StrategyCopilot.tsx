
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { BrandProfile } from '../../types/brand';
import { BrandService } from '../../services/data/brands';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export const StrategyCopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: "Hello. I'm your FashionOS strategist. Ask me about pricing, competitor analysis, or draft a buyer email." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    BrandService.get().then(setProfile);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      // Prepare context
      const brandContext = profile ? {
         brandName: profile.brandName,
         category: profile.auditResult?.brand_profile?.category,
         pricePositioning: profile.auditResult?.brand_profile?.price_positioning,
         vibeDescription: profile.auditResult?.brand_profile?.vibe_description
      } : null;

      let replyText = "I'm in demo mode. Connect Supabase to chat with Gemini 3 Pro.";

      if (anonKey) {
         const response = await fetch(`${SUPABASE_FUNCTION_URL}/brand-copilot`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${anonKey}`,
            },
            body: JSON.stringify({
               message: userMsg.content,
               history: messages.map(m => ({ role: m.role, content: m.content })),
               brandContext
            })
         });
         
         if (response.ok) {
            const data = await response.json();
            replyText = data.reply;
         }
      } else {
         // Simple mock logic for demo
         await new Promise(r => setTimeout(r, 1000));
         if (userMsg.content.toLowerCase().includes('email')) {
            replyText = "Subject: Introducing [Brand Name] SS25\n\nDear [Buyer Name],\n\nI hope this email finds you well. I'm excited to share our latest collection...";
         } else if (userMsg.content.toLowerCase().includes('price')) {
            replyText = "Based on your margin goals of 65%, I recommend a wholesale price of $145 for the silk blouse, retailing at $360.";
         }
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', content: replyText }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-6 h-6 animate-pulse group-hover:animate-none" />
      </button>

      {/* Chat Window */}
      <div 
         className={`fixed bottom-8 right-8 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${
            isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
         }`}
         style={{ height: '600px', maxHeight: '80vh' }}
      >
         {/* Header */}
         <div className="bg-[#1A1A1A] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <div className="bg-white/10 p-1.5 rounded-lg">
                  <Sparkles size={16} className="text-purple-400" />
               </div>
               <div>
                  <h3 className="font-bold text-sm">Strategy Copilot</h3>
                  <p className="text-[10px] text-gray-400">Powered by Gemini 3 Pro</p>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
               <X size={18} />
            </button>
         </div>

         {/* Messages */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
            {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                     className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-black text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                     }`}
                  >
                     <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
               </div>
            ))}
            {isTyping && (
               <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
               </div>
            )}
         </div>

         {/* Input */}
         <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
               <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about strategy..."
                  className="w-full bg-gray-100 border-none rounded-xl py-3 pl-4 pr-10 text-sm focus:ring-1 focus:ring-black outline-none"
               />
               <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                  <Send size={14} />
               </button>
            </div>
         </div>
      </div>
    </>
  );
};
