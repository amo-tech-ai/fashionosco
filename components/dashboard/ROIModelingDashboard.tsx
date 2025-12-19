import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Target, Info, 
  Sparkles, Loader2, BarChart3, Globe,
  ArrowUpRight, AlertCircle, Zap,
  ArrowRight, CheckCircle2, ExternalLink
} from 'lucide-react';
import { ROIPrediction } from '../../types/roi';
import { generateROIPrediction, simulateROIWithScenario } from '../../services/ai/roi';
import { useActiveCampaign } from '../../contexts/ActiveCampaignContext';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';

export const ROIModelingDashboard: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const [prediction, setPrediction] = useState<ROIPrediction & { grounding_sources?: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scenarioPrompt, setScenarioPrompt] = useState('');

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

  const handleSimulate = async () => {
    if (!scenarioPrompt.trim()) return;
    setIsLoading(true);
    try {
      const result = await simulateROIWithScenario(scenarioPrompt, activeCampaign);
      setPrediction(result);
      setScenarioPrompt('');
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
          <h3 className="font-serif text-2xl">Gemini is modeling ROI...</h3>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold font-mono">Running Monte Carlo Visual Simulations</p>
        </div>
      </div>
    );
  }

  if (!prediction) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* 1. Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[#0A0A0A] text-white p-8 rounded-[2rem] relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl group-hover:bg-purple-600/30 transition-all"></div>
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

         <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block">Est. Organic Reach</span>
            <div className="text-4xl font-serif text-black tabular-nums">
               {prediction.estimatedReach.min.toLocaleString()} - {prediction.estimatedReach.max.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
               <ArrowUpRight size={14} /> High Growth Cluster
            </div>
         </div>

         <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block">Conversion Lift</span>
            <div className="text-4xl font-serif text-black">+{prediction.conversionLift}%</div>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-purple-600 bg-purple-50 w-fit px-2 py-1 rounded">
               <Sparkles size={14} /> Optimized Content Engine
            </div>
         </div>
      </div>

      {/* 2. Scenario Simulator */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 mb-4">
            <Zap size={14} fill="currentColor" /> Strategic Sandbox
         </div>
         <h3 className="font-serif text-2xl mb-6 text-black">Simulate Creative Pivot</h3>
         <div className="flex gap-4">
            <input 
               type="text" 
               value={scenarioPrompt}
               onChange={(e) => setScenarioPrompt(e.target.value)}
               placeholder="Example: 'What if we swap 3 stills for 4K macro video reels?'"
               className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-6 text-sm focus:outline-none focus:border-black transition-all"
            />
            <Button onClick={handleSimulate} disabled={!scenarioPrompt.trim()}>
               Simulate Impact
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            {/* 3. Detailed Metrics */}
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
               <h3 className="font-serif text-2xl text-black mb-10">Performance Indicators</h3>
               <div className="space-y-6">
                  {prediction.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-50 group hover:border-purple-200 transition-all">
                       <div className="space-y-1 mb-4 md:mb-0">
                          <h4 className="font-bold text-lg text-gray-900">{metric.label}</h4>
                          <p className="text-xs text-gray-500 max-w-sm font-light leading-relaxed">{metric.description}</p>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="text-right">
                             <div className="text-3xl font-serif font-bold text-black tabular-nums">{metric.value}</div>
                             {metric.change !== 0 && (
                               <div className={`text-[10px] font-black flex items-center justify-end gap-1 mt-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                                  {metric.trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                  {metric.change > 0 ? `+${metric.change}%` : `${metric.change}%`}
                               </div>
                             )}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* 4. Strategic Reasoning & Grounding */}
            <div className="bg-[#FAF9F6] border border-gray-100 p-10 rounded-[2.5rem] relative overflow-hidden">
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                     <Zap size={18} className="text-purple-600" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-600">AI Strategic Rationale</h4>
               </div>
               <p className="text-xl font-light leading-relaxed text-gray-800 italic relative z-10 font-serif mb-8">
                  "{prediction.reasoning}"
               </p>

               {/* Grounding Sources extraction as per rules */}
               {prediction.grounding_sources && prediction.grounding_sources.length > 0 && (
                  <div className="relative z-10 pt-6 border-t border-gray-200">
                     <h5 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                        <Globe size={10} /> Market Grounding Sources
                     </h5>
                     <div className="flex flex-wrap gap-2">
                        {prediction.grounding_sources.map((src, i) => (
                           <a 
                              key={i} 
                              href={src.uri} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-600 hover:border-black transition-all group"
                           >
                              {src.title} <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" />
                           </a>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* 5. Competitor Analysis */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm h-full flex flex-col">
               <h3 className="font-serif text-2xl text-black mb-10">Competitor Pulse</h3>
               
               <div className="space-y-8 flex-1">
                  {prediction.competitorAnalysis.map((comp, i) => (
                    <div key={i} className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-900">{comp.brandName}</span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">{comp.overlap}% Vibe Sync</span>
                       </div>
                       <div className="space-y-3">
                          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-2xl border border-green-100/50">
                             <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
                             <p className="text-[11px] text-green-900 leading-snug font-medium"><strong>Advantage:</strong> {comp.advantage}</p>
                          </div>
                          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100/50">
                             <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                             <p className="text-[11px] text-red-900 leading-snug font-medium"><strong>Risk:</strong> {comp.disadvantage}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="mt-12 pt-8 border-t border-gray-100">
                  <Button 
                    variant={ButtonVariant.SECONDARY} 
                    className="w-full justify-center py-5 rounded-2xl text-[10px] font-black"
                    onClick={handleGenerate}
                  >
                     Recalibrate Baseline
                  </Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};