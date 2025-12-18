
import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { ProductionCue } from '../../../../types/production';

interface ShowFlowProps {
  cues: ProductionCue[];
  activeCueIndex: number;
  onJumpToCue: (index: number) => void;
}

export const ShowFlow: React.FC<ShowFlowProps> = ({ cues, activeCueIndex, onJumpToCue }) => {
  return (
    <aside className="w-80 md:w-96 border-l border-white/10 bg-[#050505] flex flex-col shrink-0">
      <div className="p-8 border-b border-white/10 bg-black/40">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Master Show Flow</h3>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {cues.map((cue, idx) => {
          const isPast = idx < activeCueIndex;
          const isActive = idx === activeCueIndex;
          
          return (
            <div 
              key={cue.id}
              onClick={() => onJumpToCue(idx)}
              className={`p-8 border-b border-white/5 transition-all duration-500 cursor-pointer group ${
                isActive ? 'bg-purple-600/10 border-l-4 border-l-purple-600 opacity-100' : 
                isPast ? 'opacity-20 grayscale' : 'opacity-40 hover:opacity-100 hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs font-bold ${isActive ? 'text-purple-400' : 'text-gray-400'}`}>{cue.time}</span>
                {isPast ? (
                  <CheckCircle2 size={12} className="text-green-500" />
                ) : (
                  <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{cue.duration}</span>
                )}
              </div>
              <h4 className={`font-bold text-base tracking-tight transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {cue.title}
              </h4>
              {isActive && (
                <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase text-purple-400 animate-pulse">
                  <Clock size={12} /> Live Tracking Active
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
