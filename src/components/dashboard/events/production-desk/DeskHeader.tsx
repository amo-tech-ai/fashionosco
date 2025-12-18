import React from 'react';
import { X, Radio, Maximize2 } from 'lucide-react';

interface DeskHeaderProps {
  campaignTitle?: string;
  isRunning: boolean;
  time: Date;
  onClose: () => void;
}

export const DeskHeader: React.FC<DeskHeaderProps> = ({ campaignTitle, isRunning, time, onClose }) => {
  return (
    <header className="h-20 border-b border-white/10 flex justify-between items-center px-10 bg-black shrink-0">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]' : 'bg-gray-600'}`}></div>
          <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isRunning ? 'text-red-600' : 'text-gray-500'}`}>
            {isRunning ? 'PRODUCTION LIVE' : 'STANDBY'}
          </span>
        </div>
        <div className="h-6 w-px bg-white/10 hidden md:block"></div>
        <div className="hidden md:flex items-center gap-3 text-gray-500">
          <Radio size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{campaignTitle || 'ACTIVE SHOW'} // CONSOLE 01</span>
        </div>
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-bold tracking-tighter tabular-nums text-white">
        {time.toLocaleTimeString([], { hour12: false })}
      </div>

      <div className="flex items-center gap-6">
        <button className="text-gray-500 hover:text-white transition-colors"><Maximize2 size={20} /></button>
        <button 
          onClick={onClose} 
          className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"
        >
          <X size={24} />
        </button>
      </div>
    </header>
  );
};