
import React from 'react';
import { Play, Pause, SkipForward, Activity } from 'lucide-react';

interface ControlBarProps {
  isRunning: boolean;
  onToggle: () => void;
  onNext: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({ isRunning, onToggle, onNext }) => {
  return (
    <div className="p-10 lg:p-12 bg-black/80 backdrop-blur-xl border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shrink-0 relative z-20">
      <div className="flex flex-wrap justify-center gap-6">
        <button 
          onClick={onToggle}
          className={`group flex items-center gap-4 px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 ${
            isRunning 
              ? 'bg-yellow-500 text-black shadow-[0_0_40px_rgba(234,179,8,0.15)] hover:bg-yellow-400' 
              : 'bg-red-600 text-white shadow-[0_0_40px_rgba(220,38,38,0.2)] hover:bg-red-500'
          }`}
        >
          {isRunning ? <><Pause size={24} fill="currentColor" /> PAUSE SESSION</> : <><Play size={24} fill="currentColor" /> START PRODUCTION</>}
        </button>
        
        <button 
          onClick={onNext}
          className="flex items-center gap-4 px-12 py-6 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-100 hover:scale-105 transition-all active:scale-95 shadow-xl"
        >
          ADVANCE CUE <SkipForward size={24} fill="currentColor" />
        </button>
      </div>
      
      <div className="flex items-center gap-10">
        <div className="hidden xl:block">
           <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-2">Atmospheric Context</div>
           <div className="text-sm font-bold text-gray-400 flex items-center gap-2">
              <Activity size={14} className="text-blue-500" /> Golden Hour: 17:42
           </div>
        </div>
        <div className="h-10 w-px bg-white/10 hidden xl:block"></div>
        <div className="text-center md:text-right">
          <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Telemetry Health</div>
          <div className="text-2xl font-bold text-green-500 flex items-center gap-3 justify-center md:justify-end">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> 14MS // NOMINAL
          </div>
        </div>
      </div>
    </div>
  );
};
