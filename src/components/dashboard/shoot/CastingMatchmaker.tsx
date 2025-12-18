
import React, { useState, useEffect } from 'react';
import { UserPlus, Sparkles, Check, Loader2, Star } from 'lucide-react';
import { Stakeholder, StakeholderService } from '../../../services/data/stakeholders';
import { analyzeCastingFit, CastingFit } from '../../../services/ai/casting';
import { useToast } from '../../ToastProvider';

interface CastingMatchmakerProps {
  vibe: string;
}

export const CastingMatchmaker: React.FC<CastingMatchmakerProps> = ({ vibe }) => {
  const [talent, setTalent] = useState<Stakeholder[]>([]);
  const [matches, setMatches] = useState<CastingFit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    StakeholderService.getAll().then(setTalent);
  }, []);

  const runCastingAgent = async () => {
    setIsLoading(true);
    try {
      const results = await analyzeCastingFit(vibe, talent);
      setMatches(results);
      addToast("Cura: Portfolio analysis complete.", "success");
    } catch (e) {
      addToast("Casting agent failed to connect.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-purple-600 flex items-center gap-2 mb-1">
             <Sparkles size={12} fill="currentColor" /> Cura Agent
          </h3>
          <h2 className="font-serif text-2xl text-black">Aesthetic Matchmaking</h2>
        </div>
        <button 
          onClick={runCastingAgent}
          disabled={isLoading}
          className="px-6 py-3 bg-[#0A0A0A] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
          Analyze Roster
        </button>
      </div>

      <div className="space-y-4">
        {matches.length > 0 ? (
          matches.slice(0, 3).map(match => {
            const person = talent.find(t => t.id === match.id);
            if (!person) return null;
            return (
              <div key={match.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 group hover:border-purple-200 transition-all">
                <div className="w-14 h-14 rounded-xl overflow-hidden relative shadow-sm shrink-0">
                  <img src={person.img} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-[10px] font-black text-white">{match.fitScore}%</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-black truncate">{person.name}</h4>
                    <span className="text-[10px] font-black text-purple-600 uppercase">{match.fitScore}% Match</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1 italic">"{match.reasoning}"</p>
                </div>
                <button className="p-2 bg-white text-gray-400 rounded-lg hover:text-black hover:shadow-sm transition-all">
                   <Star size={14} />
                </button>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-gray-400 italic text-sm font-light">
            Initialize Cura to scan the directory for "${vibe}" compatibility.
          </div>
        )}
      </div>
    </div>
  );
};
