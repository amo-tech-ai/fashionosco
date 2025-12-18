
import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, ChevronRight, Search, Bot, Loader2, Maximize2, Minimize2, Activity, Zap, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAssistant } from '../../contexts/AssistantContext';
import { ConciergeAction } from '../../services/ai/concierge';

export const AssistantPanel: React.FC = () => {
  const { isOpen, closeAssistant, messages, sendMessage, isTyping } = useAssistant();
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  const handleAction = (action: ConciergeAction) => {
    if (action.type === 'navigate') {
      navigate(action.payload);
      closeAssistant();
    } else if (action.type === 'search') {
      navigate(`/directory?q=${encodeURIComponent(action.payload)}`);
      closeAssistant();
    }
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput('');
  };

  if (!isOpen) return null;

  const isProductionMode = location.pathname === '/production';

  return (
    <div className={`
      fixed inset-y-0 right-0 z-[100] bg-white/80 backdrop-blur-2xl border-l border-gray-100 flex flex-col 
      shadow-[0_0_80px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out font-sans
      ${isExpanded ? 'w-full sm:w-[700px]' : 'w-full sm:w-[450px]'}
      animate-in slide-in-from-right
    `}>
      {/* Editorial Header */}
      <div className="flex flex-col">
        <div className="h-24 flex items-center justify-between px-8 bg-white/50 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-14 h-14 bg-[#0A0A0A] rounded-full flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-105">
                <Sparkles size={24} className="text-purple-300 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-[#0A0A0A]">FashionOS Concierge</h3>
              <div className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.2em] text-purple-600">
                 <span className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse"></div>
                   Tactical Intelligence
                 </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hidden sm:block"
            >
              {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button onClick={closeAssistant} className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Context Strip: Global production health awareness */}
        {isProductionMode && (
          <div className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between shadow-lg z-10 animate-in slide-in-from-top-full">
             <div className="flex items-center gap-3">
                <Activity size={14} className="animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Monitoring Set Velocity & Atmospheric Risk</span>
             </div>
             <div className="flex items-center gap-2">
                <ShieldCheck size={12} fill="currentColor" />
                <span className="text-[9px] font-bold uppercase">Safe Mode Active</span>
             </div>
          </div>
        )}
      </div>

      {/* Message Container */}
      <div className="flex-1 overflow-y-auto p-10 space-y-12 scroll-smooth hide-scrollbar" ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-6 duration-500`}>
            <div className={`
              max-w-[95%] p-6 text-base leading-relaxed tracking-tight
              ${m.role === 'user' 
                ? 'bg-[#0A0A0A] text-white rounded-[2.5rem] rounded-tr-none shadow-2xl' 
                : 'bg-white border border-gray-100 text-[#1A1A1A] rounded-[2.5rem] rounded-tl-none shadow-sm font-light'}
            `}>
              {m.text}
            </div>
            
            {m.actions && (
              <div className="flex flex-wrap gap-3 mt-8">
                {m.actions.map((action, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAction(action)}
                    className="px-6 py-3 bg-white border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group shadow-md"
                  >
                    {action.label} 
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform opacity-50" />
                  </button>
                ))}
              </div>
            )}
            
            <span className={`text-[9px] uppercase font-black tracking-[0.3em] mt-4 opacity-20 ${m.role === 'user' ? 'mr-6' : 'ml-6'}`}>
               {m.role === 'user' ? 'DIRECTIVE' : 'LOGIC'}
            </span>
          </div>
        ))}
        {isTyping && (
           <div className="flex gap-2 items-center p-6 bg-white border border-gray-50 rounded-[2rem] rounded-tl-none w-24 shadow-inner">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
           </div>
        )}
      </div>

      {/* Command Input Area */}
      <div className="p-10 bg-white/90 backdrop-blur-xl border-t border-gray-100">
        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isProductionMode ? "Command Set: 'Update crew call', 'Refine show order'..." : "Ask for strategic or operational direction..."}
            className="w-full pl-8 pr-16 py-6 bg-[#F9F8F6] border-none rounded-[2.5rem] text-base focus:ring-1 focus:ring-[#0A0A0A] focus:bg-white transition-all duration-300 outline-none text-[#1A1A1A] placeholder:text-gray-400 shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-[#0A0A0A] text-white rounded-full shadow-2xl hover:bg-black disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <div className="mt-6 flex justify-center gap-8 text-[10px] font-black uppercase tracking-[0.25em] text-gray-300">
            <span className="flex items-center gap-2 hover:text-black transition-colors cursor-help"><Search size={14} strokeWidth={3}/> Project Scout</span>
            <span className="flex items-center gap-2 hover:text-black transition-colors cursor-help"><Bot size={14} strokeWidth={3}/> Gemini Reasoning</span>
            <span className="flex items-center gap-2 hover:text-black transition-colors cursor-help"><Activity size={14} strokeWidth={3}/> Set Telemetry</span>
        </div>
      </div>
    </div>
  );
};
