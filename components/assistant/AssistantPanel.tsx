import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, ChevronRight, Search, Bot, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAssistant } from '../../contexts/AssistantContext';
import { ConciergeAction } from '../../services/ai/concierge';

export const AssistantPanel: React.FC = () => {
  const { isOpen, closeAssistant, messages, sendMessage, isTyping } = useAssistant();
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  return (
    <div className={`
      fixed inset-y-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-l border-gray-100 flex flex-col 
      shadow-[0_0_50px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out font-sans
      ${isExpanded ? 'w-full sm:w-[600px]' : 'w-full sm:w-[420px]'}
      animate-in slide-in-from-right
    `}>
      {/* Editorial Header */}
      <div className="h-24 border-b border-gray-100 flex items-center justify-between px-8 bg-white/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-[#0A0A0A] rounded-full flex items-center justify-center text-white shadow-xl">
              <Sparkles size={22} className="text-purple-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold tracking-tight text-[#0A0A0A]">FashionOS Concierge</h3>
            <div className="flex items-center gap-2 text-[9px] uppercase font-black tracking-[0.2em] text-purple-600">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
               </span>
               Intelligence Active
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hidden sm:block"
          >
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button onClick={closeAssistant} className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Narrative-driven Messages Container */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10 scroll-smooth hide-scrollbar" ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`
              max-w-[90%] p-5 text-sm leading-relaxed tracking-wide
              ${m.role === 'user' 
                ? 'bg-[#0A0A0A] text-white rounded-3xl rounded-tr-none shadow-2xl' 
                : 'bg-white border border-gray-100 text-[#1A1A1A] rounded-3xl rounded-tl-none shadow-sm'}
            `}>
              {m.text}
            </div>
            
            {m.actions && (
              <div className="flex flex-wrap gap-3 mt-6">
                {m.actions.map((action, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAction(action)}
                    className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-[0.15em] hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group shadow-sm"
                  >
                    {action.label} 
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform opacity-50" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
           <div className="flex gap-1.5 items-center p-5 bg-white border border-gray-50 rounded-3xl rounded-tl-none w-20 shadow-sm">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
           </div>
        )}
      </div>

      {/* Input Architecture */}
      <div className="p-8 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Search OS or ask for creative advice..."
            className="w-full pl-6 pr-14 py-5 bg-[#F9F8F6] border-none rounded-[2rem] text-sm focus:ring-1 focus:ring-[#0A0A0A] focus:bg-white transition-all duration-300 outline-none text-[#1A1A1A] placeholder:text-gray-400"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-3 bg-[#0A0A0A] text-white rounded-full shadow-2xl hover:bg-black disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
            <span className="flex items-center gap-2 hover:text-black transition-colors cursor-help"><Search size={12} strokeWidth={3}/> Command Space</span>
            <span className="flex items-center gap-2 hover:text-black transition-colors cursor-help"><Bot size={12} strokeWidth={3}/> Gemini 3 Live</span>
        </div>
      </div>
    </div>
  );
};