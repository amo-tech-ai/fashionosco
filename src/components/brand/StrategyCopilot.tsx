import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Zap, ArrowRight, MousePointer2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BrandProfile } from '../../types/brand';
import { BrandService } from '../../services/data/brands';
import { startCopilotStream, CopilotMessage } from '../../services/ai/copilot';
import { useShootWizard } from '../../contexts/ShootWizardContext';
import { useToast } from '../ToastProvider';

export const StrategyCopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { id: '1', role: 'model', content: "Strategist online. How can I refine your production flow today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { dispatch: wizardDispatch } = useShootWizard();

  useEffect(() => {
    BrandService.get().then(setProfile);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  const handleToolCall = (call: any) => {
    const { name, args } = call;
    console.log(`AI Tool Interaction: ${name}`, args);

    switch (name) {
      case 'navigateTo':
        addToast(`AI navigating to ${args.path}...`, "info");
        navigate(args.path);
        setIsOpen(false);
        break;
      case 'updateProjectField':
        addToast(`AI updating brief: ${args.field} -> ${args.value}`, "success");
        wizardDispatch({ type: 'SET_FIELD', field: args.field, value: args.value });
        break;
      case 'generateAsset':
        addToast(`AI triggering ${args.assetType} generation...`, "info");
        // Logic to open specific generation tools
        break;
      default:
        console.warn('Unknown tool call:', name);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    const userMsg = { id: Date.now().toString(), role: 'user', content: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Prepare History for Gemini API format
    const history: CopilotMessage[] = messages
      .filter(m => m.id !== '1') // Skip initial greeting for clean context
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

    const brandContext = profile ? {
      brandName: profile.brandName,
      category: profile.auditResult?.brand_profile?.category,
      vibe: profile.auditResult?.brand_profile?.vibe_description
    } : {};

    try {
      const responseStream = await startCopilotStream(userText, history, brandContext);
      
      let fullText = '';
      const modelMsgId = (Date.now() + 1).toString();
      
      // Initialize model message
      setMessages(prev => [...prev, { id: modelMsgId, role: 'model', content: '' }]);

      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullText += chunk.text;
          setMessages(prev => prev.map(m => 
            m.id === modelMsgId ? { ...m, content: fullText } : m
          ));
        }

        if (chunk.functionCalls) {
          chunk.functionCalls.forEach(handleToolCall);
        }
      }
    } catch (error) {
      console.error('Copilot Stream Error:', error);
      addToast("Connection to Strategist lost.", "error");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group ${isOpen ? 'hidden' : 'flex'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full animate-pulse"></div>
        <Sparkles className="w-6 h-6 relative z-10" />
      </button>

      <div 
         className={`fixed bottom-8 right-8 z-50 w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right ${
            isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
         }`}
         style={{ height: '650px', maxHeight: '85vh' }}
      >
         {/* Premium Header */}
         <div className="bg-[#0A0A0A] text-white p-6 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center gap-4 relative z-10">
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Sparkles size={20} className="text-purple-400" />
               </div>
               <div>
                  <h3 className="font-serif text-xl font-bold tracking-tight">Strategy Copilot</h3>
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-purple-400">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                     Interactions API Live
                  </div>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors p-2 relative z-10">
               <X size={20} />
            </button>
         </div>

         {/* Chat Area */}
         <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FCFBFA] hide-scrollbar" ref={scrollRef}>
            {messages.map((msg) => (
               <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
                  <div 
                     className={`max-w-[90%] p-4 rounded-3xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-[#1A1A1A] text-white rounded-br-none shadow-xl' 
                        : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm font-light'
                     }`}
                  >
                     <p className="whitespace-pre-wrap">{msg.content || (msg.role === 'model' && !isTyping ? '...' : '')}</p>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-gray-300 mt-2 tracking-widest">{msg.role === 'user' ? 'You' : 'FashionOS AI'}</span>
               </div>
            ))}
            {isTyping && !messages[messages.length - 1].content && (
               <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                     <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></span>
                     <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                     <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
               </div>
            )}
         </div>

         {/* Action Bar / Input */}
         <div className="p-6 bg-white border-t border-gray-50">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                <button 
                  onClick={() => setInput("Take me to the shot list")}
                  className="shrink-0 px-3 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:border-black hover:text-black transition-all flex items-center gap-1.5"
                >
                  <MousePointer2 size={10} /> Navigate to Shots
                </button>
                <button 
                  onClick={() => setInput("Suggest a moodier vibe")}
                  className="shrink-0 px-3 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:border-black hover:text-black transition-all flex items-center gap-1.5"
                >
                  <Zap size={10} /> Refine Vibe
                </button>
            </div>
            
            <div className="relative group">
               <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Direct your strategist..."
                  className="w-full bg-[#F7F7F5] border-none rounded-2xl py-4 pl-5 pr-12 text-sm focus:ring-1 focus:ring-black outline-none transition-all"
               />
               <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-20 transition-all"
               >
                  <ArrowRight size={18} />
               </button>
            </div>
         </div>
      </div>
    </>
  );
};
