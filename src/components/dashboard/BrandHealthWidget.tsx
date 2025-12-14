
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, TrendingUp, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { BrandService } from '../../services/data/brands';
import { BrandProfile } from '../../types/brand';

export const BrandHealthWidget: React.FC = () => {
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBrand = async () => {
      const data = await BrandService.get();
      setProfile(data);
    };
    loadBrand();
    
    // Listen for updates from the wizard
    window.addEventListener('brandProfileUpdated', loadBrand);
    return () => window.removeEventListener('brandProfileUpdated', loadBrand);
  }, []);

  if (!profile || !profile.auditResult) {
    return (
      <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[300px]">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <Activity size={20} className="text-gray-400" />
        </div>
        <div>
          <h3 className="font-serif text-lg text-[#1A1A1A]">Brand Audit</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-[200px] mx-auto">Get an AI analysis of your market position and visual strategy.</p>
        </div>
        <button 
          onClick={() => navigate('/create-profile')}
          className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 hover:text-gray-600 transition-colors"
        >
          Start Audit
        </button>
      </div>
    );
  }

  const { audit_score, strategic_advice, signals } = profile.auditResult;

  const getStrength = () => {
    if (signals.visual_quality === 'High') return 'Visual Quality';
    if (signals.brand_voice_consistency === 'Strong') return 'Brand Voice';
    if (signals.market_positioning === 'Clear') return 'Market Focus';
    if (signals.website_ux === 'Modern') return 'User Experience';
    return 'Growth Potential';
  };

  const getWeakness = () => {
     if (signals.social_presence === 'None' || signals.social_presence === 'Sparse') return 'Social Presence';
     if (signals.website_ux === 'Outdated') return 'Website UX';
     if (signals.visual_quality === 'Low') return 'Visual Assets';
     if (signals.market_positioning === 'Vague') return 'Positioning';
     return 'Content Frequency';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-6 h-full relative overflow-hidden group min-h-[300px] flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-100 transition-colors"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <h3 className="font-serif text-lg text-[#1A1A1A]">{profile.brandName}</h3>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Brand Health</p>
        </div>
        <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-green-100 flex items-center gap-1">
          <TrendingUp size={10} /> Live
        </div>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <div className="flex justify-between items-end mb-1">
            <span className={`text-4xl font-serif ${getScoreColor(audit_score)}`}>{audit_score}</span>
            <span className="text-xs text-gray-400 mb-2 font-medium">/ 100</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(audit_score)}`} style={{ width: `${audit_score}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
           <div className="bg-green-50/50 p-3 rounded-lg border border-green-100">
              <span className="text-[9px] uppercase font-bold text-green-700 block mb-1 flex items-center gap-1">
                 <CheckCircle2 size={10} /> Top Strength
              </span>
              <span className="text-xs font-bold text-gray-800">{getStrength()}</span>
           </div>
           <div className="bg-red-50/50 p-3 rounded-lg border border-red-100">
              <span className="text-[9px] uppercase font-bold text-red-700 block mb-1 flex items-center gap-1">
                 <AlertCircle size={10} /> Focus Area
              </span>
              <span className="text-xs font-bold text-gray-800">{getWeakness()}</span>
           </div>
        </div>

        {strategic_advice && strategic_advice.length > 0 && (
           <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 relative overflow-hidden">
              <div className="relative z-10">
                 <span className="text-[9px] uppercase font-bold text-purple-700 block mb-1 flex items-center gap-1">
                    <Sparkles size={10} /> AI Opportunity
                 </span>
                 <p className="text-xs text-purple-900 leading-relaxed font-medium line-clamp-2">
                    {strategic_advice[0].title}
                 </p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10">
                 <Sparkles size={40} className="text-purple-600 -mb-2 -mr-2" />
              </div>
           </div>
        )}
      </div>

      <div className="pt-6 mt-auto">
        <button 
          onClick={() => navigate('/dashboard/brand')}
          className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest text-center border border-gray-200 rounded-lg hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all"
        >
          View Full Report <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};
