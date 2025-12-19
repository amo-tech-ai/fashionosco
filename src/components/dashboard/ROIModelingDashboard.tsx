
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Target, Info, 
  Sparkles, Loader2, BarChart3, Users, 
  ArrowUpRight, AlertCircle, Zap,
  // Added ArrowRight and CheckCircle2 to fix missing name errors
  ArrowRight, CheckCircle2
} from 'lucide-react';
import { ROIPrediction } from '../../types/roi';
import { generateROIPrediction } from '../../services/ai/roi';
import { useActiveCampaign } from '../../contexts/ActiveCampaignContext';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';

export const ROIModelingDashboard: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const [prediction, setPrediction] = useState<ROIPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeCampaign && !prediction) {
       handleGenerate();
    }
  }, [activeCampaign]);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await generateROIPrediction(activeCampaign);
      setPrediction(result);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
          <Sparkles className="absolute -top-2 -right-2 text-purple-400 animate-pulse" size={20} />
        </div>
        <div>
          <h3 className="font-serif text-2xl">Gemini is modeling your ROI...</h3>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold">Correlating shot list with market benchmarks</p>
        </div>
      </div>
    );
  }

  if (!prediction) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Header Stat Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[#1A1A1A] text-white p-8 rounded-[2rem] relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl group-hover:bg-purple-600/30 transition-all duration-1000"></div>
            <div className="relative z-10 flex justify-between items-start">
               <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 block">Market Readiness</span>
                  <div className="text-5xl font-serif">{prediction.overallImpactScore}%</div>
               </div>
               <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <Target size={24} className="text-purple-400" />
               </div>
            </div>
         </div>

         <div className="bg-white border border-gray-200 p-8 rounded-[2rem] shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block">Est. Organic Reach</span>
            <div className="text-4xl font-serif text-black">
               {prediction.estimatedReach.min.toLocaleString()} - {prediction.estimatedReach.max.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
               <ArrowUpRight size={14} /> High Growth Cluster
            </div>
         </div>

         <div className="bg-white border border-gray-200 p-8 rounded-[2rem] shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block">Conversion Lift</span>
            <div className="text-4xl font-serif text-black">+{prediction.conversionLift}%</div>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-purple-600 bg-purple-50 w-fit px-2 py-1 rounded">
               <Sparkles size={14} /> AI Optimized Brief
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Main Chart/Breakdown */}
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="font-serif text-2xl text-black">Performance Benchmarks</h3>
                  <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-2">
                     <Info size={14} /> Methodology
                  </button>
               </div>

               <div className="space-y-8">
                  {prediction.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-50 group hover:border-purple-200 transition-all">
                       <div className="space-y-1 mb-4 md:mb-0">
                          <h4 className="font-bold text-lg text-gray-900">{metric.label}</h4>
                          <p className="text-xs text-gray-500 max-w-sm">{metric.description}</p>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="text-right">
                             <div className="text-2xl font-serif font-bold text-black">{metric.value}</div>
                             {metric.change !== 0 && (
                               <div className={`text-[10px] font-black flex items-center justify-end gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                                  {metric.trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                  {metric.change > 0 ? `+${metric.change}%` : `${metric.change}%`}
                               </div>
                             )}
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                             <ArrowRight size={16} className="text-gray-300 group-hover:text-black transition-all" />
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* AI Reasoning Block */}
            <div className="bg-[#FAF9F6] border border-gray-100 p-10 rounded-[2.5rem] relative overflow-hidden">
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                     <Zap size={18} className="text-purple-600" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-600">Strategic Reasoning Trace</h4>
               </div>
               <p className="text-xl font-light leading-relaxed text-gray-800 italic relative z-10">
                  "{prediction.reasoning}"
               </p>
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BarChart3 size={120} />
               </div>
            </div>
         </div>

         {/* Competitor Audit */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm h-full">
               <h3 className="font-serif text-2xl text-black mb-8">Competitor Pulse</h3>
               
               <div className="space-y-8">
                  {prediction.competitorAnalysis.map((comp, i) => (
                    <div key={i} className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-900">{comp.brandName}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{comp.overlap}% Vibe Overlap</span>
                       </div>
                       <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100/50">
                             <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
                             <p className="text-[11px] text-green-900 leading-snug">{comp.advantage}</p>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100/50">
                             <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                             <p className="text-[11px] text-red-900 leading-snug">{comp.disadvantage}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="mt-12 pt-8 border-t border-gray-100">
                  <Button 
                    variant={ButtonVariant.SECONDARY} 
                    className="w-full justify-center py-4 rounded-xl text-[10px]"
                    onClick={handleGenerate}
                  >
                     Recalibrate Modeling
                  </Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
