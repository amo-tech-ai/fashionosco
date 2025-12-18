
import React from 'react';
import { useShootWizard } from '../../contexts/ShootWizardContext';
import { Sparkles, TrendingUp, Info, ChevronRight } from 'lucide-react';

export const AIRecommendationSidebar: React.FC = () => {
  const { state } = useShootWizard();
  
  const getRecommendation = () => {
    switch (state.step) {
      case 1:
        return {
          title: "Strategic Start",
          tip: "Most luxury labels are currently pivoting towards 'Campaign' shoots for FW25 to capture cinematic textures.",
          confidence: 92
        };
      case 2:
        return {
          title: "Optimized Duration",
          tip: "For 15+ items, a Full Day shoot ensures enough buffer for complex lighting resets.",
          confidence: 88
        };
      case 3:
        return {
          title: "Visual Alignment",
          tip: "Your 'Minimalist' vibe pairs best with high-contrast, Rembrandt-style lighting.",
          confidence: 95
        };
      default:
        return {
          title: "Intelligence Active",
          tip: "Gemini is analyzing your selections to maximize production ROI.",
          confidence: 100
        };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="space-y-6 sticky top-32">
      <div className="luxury-card p-8 bg-[#0A0A0A] text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all duration-1000"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={16} className="text-purple-400 animate-pulse" fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Live AI Logic</span>
          </div>

          <h4 className="font-serif text-2xl mb-4">{rec.title}</h4>
          <p className="text-sm text-gray-400 font-light leading-relaxed mb-8 italic">
            "{rec.tip}"
          </p>

          <div className="space-y-4 pt-6 border-t border-white/10">
             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <span>Confidence Level</span>
                <span className="text-purple-400">{rec.confidence}%</span>
             </div>
             <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: `${rec.confidence}%` }}></div>
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 border border-gray-100 rounded-[2rem] bg-white shadow-sm flex items-start gap-4">
        <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
           <TrendingUp size={16} />
        </div>
        <div>
           <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">ROI Signal</h5>
           <p className="text-xs text-gray-600 leading-relaxed font-medium">Video assets drive 3x more engagement in your niche.</p>
        </div>
      </div>
    </div>
  );
};
