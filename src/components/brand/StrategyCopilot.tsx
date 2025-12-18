
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, ArrowRight, MousePointer2, Zap } from 'lucide-react';
import { BrandProfile } from '../../types/brand';
import { BrandService } from '../../services/data/brands';
import { useCopilotStream } from '../../hooks/useCopilotStream';

export const StrategyCopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, isTyping, sendMessage } = useCopilotStream(profile);

  useEffect(() => {
    BrandService.get().then(setProfile);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleQuickAction = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-10 right-10 z-[60] bg-black text-white p-5 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-110 transition-all group ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
        aria-label="Open Strategy Assistant"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 scale-125 animate-ping"></div>
      </button>

      <div 
         className={`fixed bottom-10 right-10 z-[70] w-full max-w-md bg-white rounded-[3rem] shadow-[0_30px_90px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'
         }`}
         style={{ height: '750px', maxHeight: '85vh' }}
      >
         <div className="bg-[#0A0A0A] text-white p-8 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[70px]"></div>
            <div className="flex items-center gap-4 relative z-10">
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Sparkles size={22} className="text-purple-400" />
               </div>
               <div>
                  <h3 className="font-serif text-xl font-bold tracking-tight text-white">Strategy Copilot</h3>
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-purple-400">
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                     Intelligence Live
                  </div>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors p-2 relative z-10">
               <X size={24} />
            </button>
         </div>

         <div className="flex-1 overflow-y-auto p-8 space-y-10 bg-[#FCFBFA] hide-scrollbar" ref={scrollRef}>
            {messages.map((msg) => (
               <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                  <div 
                     className={`max-w-[85%] p-6 rounded-[2.2rem] text-[13px] leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-[#1A1A1A] text-white rounded-tr-none shadow-xl' 
                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none font-light'
                     }`}
                  >
                     <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <span className="text-[9px] uppercase font-black text-gray-300 mt-4 tracking-[0.2em] px-4">
                    {msg.role === 'user' ? 'Directives' : 'FashionOS Logic'}
                  </span>
               </div>
            ))}
            {isTyping && (
               <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-5 rounded-full shadow-sm flex items-center gap-2">
                     <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></span>
                     <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                     <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
               </div>
            )}
         </div>

         <div className="p-8 bg-white border-t border-gray-50">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <button 
                  onClick={() => handleQuickAction("Analyze current market gap")}
                  className="shrink-0 px-4 py-2 rounded-full border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:border-black hover:text-black transition-all flex items-center gap-2 bg-white"
                >
                  <Zap size={12} /> Strategic Gap
                </button>
                <button 
                  onClick={() => handleQuickAction("Suggest a campaign color story")}
                  className="shrink-0 px-4 py-2 rounded-full border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:border-black hover:text-black transition-all flex items-center gap-2 bg-white"
                >
                  <MousePointer2 size={12} /> Palette Suggestion
                </button>
            </div>
            
            <div className="relative group">
               <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Direct your AI strategist..."
                  className="w-full bg-[#F7F7F5] border-none rounded-[1.8rem] py-5 pl-6 pr-14 text-sm focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400 shadow-inner"
               />
               <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-3 bg-[#0A0A0A] text-white rounded-full shadow-2xl hover:bg-black disabled:opacity-20 transition-all active:scale-95"
               >
                  <ArrowRight size={20} />
               </button>
            </div>
         </div>
      </div>
    </>
  );
};
