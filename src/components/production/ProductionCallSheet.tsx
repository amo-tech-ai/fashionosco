
import React from 'react';
import { Zap, MapPin, Users, Sun } from 'lucide-react';
import { CallSheetBlock } from '../../types/production';

interface ProductionCallSheetProps {
  callSheet: CallSheetBlock[];
  hasIntervention: boolean;
  onApplyStrategy: () => void;
  onIgnore: () => void;
}

export const ProductionCallSheet: React.FC<ProductionCallSheetProps> = ({ 
  callSheet, 
  hasIntervention, 
  onApplyStrategy,
  onIgnore
}) => {
  return (
    <div className="space-y-8">
      {/* Predictive Intervention Card */}
      {hasIntervention && (
        <div className="bg-[#111] text-white p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-2xl animate-in slide-in-from-top-4 duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                    <Zap size={14} fill="currentColor" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Atmospheric Shift</span>
              </div>
              <h4 className="font-serif text-2xl">Heavy Rain predicted at 11:30.</h4>
              <p className="text-sm text-gray-400 font-light max-w-sm">
                AI recommends swapping the <strong>Outdoor Look 01</strong> with <strong>Studio Look 02</strong> to prevent equipment damage and talent fatigue.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={onApplyStrategy}
                className="px-8 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl active:scale-95"
              >
                Apply Strategy
              </button>
              <button 
                onClick={onIgnore}
                className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline List */}
      <div className="space-y-4">
        {callSheet.map((step, i) => (
          <div 
            key={step.id} 
            className={`luxury-card p-6 flex items-center gap-8 group hover:border-purple-200 transition-all ${
              step.status === 'confirmed' && i === 0 ? 'opacity-40 grayscale' : ''
            }`}
          >
            <div className="w-20 font-mono text-xl font-bold text-gray-300 group-hover:text-black transition-colors">
              {step.time}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-serif text-xl font-bold">{step.title}</h4>
                {step.ai_note && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-[8px] font-black uppercase rounded border border-purple-200 flex items-center gap-1">
                    <Zap size={8} fill="currentColor" /> {step.ai_note}
                  </span>
                )}
                {step.is_outdoor && <Sun size={14} className="text-orange-400" />}
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><MapPin size={10} /> {step.location_name}</span>
                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                <span className="flex items-center gap-1"><Users size={10} /> {step.talent_required.join(', ') || 'Crew Only'}</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
              step.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
            }`}>
              {step.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
