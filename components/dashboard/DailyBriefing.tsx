import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, ArrowRight, Loader2, Zap, AlertCircle } from 'lucide-react';
import { generateDailyBriefing, StrategicBrief } from '../../services/ai/briefing';
import { useActiveCampaign } from '../../contexts/ActiveCampaignContext';

export const DailyBriefing: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const [brief, setBrief] = useState<StrategicBrief | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeCampaign) {
      generateDailyBriefing(activeCampaign).then(data => {
        setBrief(data);
        setLoading(false);
      });
    }
  }, [activeCampaign?.id]);

  if (loading) {
    return (
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Chief of Staff Analyzing Pipeline...</p>
      </div>
    );
  }

  if (!brief) return null;

  return (
    <div className="bg-[#FAF9F6] border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm animate-in fade-in duration-700">
      <div className="p-10 lg:p-12">
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center shadow-lg">
                <Zap size={20} fill="white" />
             </div>
             <div>
                <h3 className="font-serif text-2xl text-black">Strategic Intelligence</h3>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-600">Daily Showrunner Brief</p>
             </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border border-gray-100 text-[9px] font-black uppercase tracking-widest text-gray-400">
             V2.5.0 // Gemini 3 Pro
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
             <p className="text-xl font-light leading-relaxed text-gray-800 italic font-serif border-l-2 border-purple-200 pl-8">
               "{brief.briefing_text}"
             </p>
             
             <div className="pt-6 border-t border-gray-100">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                   <Globe size={14} /> Market Grounding
                </h4>
                <div className="flex flex-wrap gap-3">
                   {brief.grounding_sources.map((src, i) => (
                      <a key={i} href={src.uri} target="_blank" className="px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-gray-600 hover:border-black transition-all">
                        {src.title}
                      </a>
                   ))}
                </div>
             </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Priority Actions</h4>
             <div className="space-y-4">
                {brief.action_items.map((item, i) => (
                   <div key={i} className={`p-5 rounded-2xl border transition-all ${item.priority === 'high' ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}>
                      <div className="flex justify-between items-start mb-2">
                         <span className="font-bold text-sm text-gray-900">{item.task}</span>
                         <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${item.priority === 'high' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                           {item.priority}
                         </span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-snug">{item.rationale}</p>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};