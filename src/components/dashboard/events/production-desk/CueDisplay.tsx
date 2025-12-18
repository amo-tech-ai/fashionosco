import React from 'react';
import { Volume2, Zap, Radio } from 'lucide-react';
import { ProductionCue } from '../../../../types/production';

interface CueDisplayProps {
  cue: ProductionCue;
  index: number;
}

export const CueDisplay: React.FC<CueDisplayProps> = ({ cue, index }) => {
  return (
    <div className="p-10 lg:p-20 flex-1 flex flex-col justify-center overflow-y-auto hide-scrollbar">
      <div className="mb-12 md:mb-20">
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-red-600 text-white text-[9px] font-black tracking-[0.4em] uppercase px-3 py-1 rounded shadow-lg shadow-red-900/40">ACTIVE CUE</span>
          <span className="text-gray-600 text-[10px] font-bold tracking-[0.2em]">SEQ_00{index + 1} // MASTER</span>
        </div>
        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-bold leading-none tracking-tighter mb-12 animate-in fade-in slide-in-from-left duration-700">
          {cue.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-4xl italic">
          "{cue.description}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div className="bg-white/5 border border-white/10 p-8 lg:p-10 rounded-[2.5rem] group hover:border-blue-500/50 transition-all hover:-translate-y-1">
          <div className="flex items-center gap-3 text-blue-400 mb-6">
            <Volume2 size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Audio Feed</span>
          </div>
          <p className="text-lg lg:text-xl font-light leading-relaxed text-gray-300">{cue.audioCue}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 lg:p-10 rounded-[2.5rem] group hover:border-yellow-500/50 transition-all hover:-translate-y-1">
          <div className="flex items-center gap-3 text-yellow-400 mb-6">
            <Zap size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Lighting Rig</span>
          </div>
          <p className="text-lg lg:text-xl font-light leading-relaxed text-gray-300">{cue.lightingCue}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 lg:p-10 rounded-[2.5rem] group hover:border-purple-500/50 transition-all hover:-translate-y-1">
          <div className="flex items-center gap-3 text-purple-400 mb-6">
            <Radio size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Stage Command</span>
          </div>
          <p className="text-lg lg:text-xl font-light leading-relaxed text-gray-300">{cue.stageCue}</p>
        </div>
      </div>
    </div>
  );
};