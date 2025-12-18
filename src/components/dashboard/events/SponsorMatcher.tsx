import React, { useState } from 'react';
import { Sparkles, ArrowRight, Target, ShieldCheck, Mail, Loader2, Globe } from 'lucide-react';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { getSponsorMatches } from '../../../services/ai/sponsorship';
import { SponsorMatch } from '../../../types/sponsorship';
import { Button } from '../../Button';
import { useToast } from '../../ToastProvider';

export const SponsorMatcher: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<SponsorMatch[]>([]);
  const [marketContext, setMarketContext] = useState('');
  const { addToast } = useToast();

  const handleMatch = async () => {
    setLoading(true);
    try {
      const result = await getSponsorMatches({
        eventTitle: activeCampaign?.title,
        location: activeCampaign?.location,
        vibe: activeCampaign?.data?.vibe || 'minimalist',
        audience: 'Luxury consumers, editors, and buyers'
      });
      setMatches(result.matches);
      setMarketContext(result.marketContext);
      addToast("AI identified compatible partners", "success");
    } catch (e) {
      addToast("Failed to run intelligence", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h2 className="font-serif text-3xl mb-3">AI Sponsor Matcher</h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed mb-8">
            Deploy Gemini 3 Pro to find luxury partners matching your event's DNA. We analyze real-time market data to find brands actively investing in your category.
          </p>
          <Button onClick={handleMatch} isLoading={loading} className="px-8">
            {matches.length > 0 ? 'Refresh Intelligence' : 'Identify Partners'}
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50 to-transparent pointer-events-none"></div>
        <Sparkles className="absolute bottom-8 right-8 text-purple-200" size={120} />
      </div>

      {marketContext && (
         <div className="bg-purple-900 text-white p-6 rounded-2xl shadow-xl animate-in slide-in-from-top-4">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-[10px] uppercase tracking-widest mb-2">
               <Globe size={14} /> Market Intelligence Report
            </div>
            <p className="text-sm font-light leading-relaxed italic opacity-90">"{marketContext}"</p>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {matches.map((match) => (
          <div key={match.id} className="luxury-card p-8 flex flex-col h-full bg-white group hover:border-black transition-all">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-[#1A1A1A] text-white rounded-2xl flex items-center justify-center font-serif text-2xl font-bold shadow-lg">
                    {match.logoPlaceholder}
                 </div>
                 <div>
                    <h3 className="text-2xl font-serif">{match.brandName}</h3>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{match.category}</span>
                 </div>
              </div>
              <div className="text-right">
                 <div className="text-2xl font-serif text-purple-600">{match.fitScore}%</div>
                 <div className="text-[9px] font-black uppercase tracking-tighter text-gray-400">Match Score</div>
              </div>
            </div>

            <div className="space-y-6 flex-1">
               <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1">
                     <Target size={12} /> Strategic Rationale
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed italic">"{match.rationale}"</p>
               </div>

               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Pitch Hook</h4>
                  <p className="text-sm text-gray-800 font-medium">{match.outreachAngle}</p>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rec. Tier:</span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded border border-blue-100 uppercase">{match.suggestedTier}</span>
               </div>
               <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black group-hover:gap-3 transition-all">
                  Generate Email <Mail size={14} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};