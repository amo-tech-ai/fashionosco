import React from 'react';
import { Users } from 'lucide-react';
import { TalentStatus } from '../../../../types/production';

interface CrewReadinessProps {
  talent: TalentStatus[];
  onToggleStatus: (id: string) => void;
}

export const CrewReadiness: React.FC<CrewReadinessProps> = ({ talent, onToggleStatus }) => {
  return (
    <aside className="w-80 md:w-96 border-r border-white/10 flex flex-col bg-[#080808] shrink-0">
      <div className="p-8 border-b border-white/10 flex justify-between items-center bg-black/40">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3">
          <Users size={16} /> Crew Readiness
        </h3>
        <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">ALL GREEN</span>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-3 hide-scrollbar">
        {talent.map(t => (
          <div 
            key={t.id} 
            onClick={() => onToggleStatus(t.id)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
              t.status === 'ready' ? 'bg-green-500/5 border-green-500/30' :
              t.status === 'dressed' ? 'bg-blue-500/5 border-blue-500/30' :
              'bg-white/5 border-white/5 opacity-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold truncate pr-2 group-hover:text-white transition-colors">{t.name}</span>
              <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest ${
                t.status === 'ready' ? 'bg-green-50 text-black' : 'bg-white/10 text-gray-400'
              }`}>
                {t.status}
              </span>
            </div>
            <div className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold">{t.role} {t.assignment && `• ${t.assignment}`}</div>
          </div>
        ))}
      </div>
    </aside>
  );
};