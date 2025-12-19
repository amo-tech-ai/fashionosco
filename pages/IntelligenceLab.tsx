import React from 'react';
import { DailyBriefing } from '../components/dashboard/DailyBriefing';
import { ROIModelingDashboard } from '../components/dashboard/ROIModelingDashboard';
import { MarketIntel } from '../components/brand/MarketIntel';
import { Sparkles, Brain, TrendingUp, Globe, Target } from 'lucide-react';

export const IntelligenceLab: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto p-6 md:p-10 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-10">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-xl">
                 <Brain size={24} />
              </div>
              <div>
                 <h1 className="font-serif text-5xl text-black">Intelligence Lab</h1>
                 <p className="text-sm text-gray-500 uppercase font-black tracking-widest mt-1 flex items-center gap-2">
                    <Sparkles size={12} className="text-purple-600" /> Powered by Gemini 3 Ultra-Reasoning
                 </p>
              </div>
           </div>
           <p className="text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
             Predictive modeling for ROI, market benchmarks, and strategic production logic. Turn signals into profit-first execution plans.
           </p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white border border-gray-100 px-6 py-4 rounded-3xl text-center shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Global Readiness</span>
              <span className="text-2xl font-serif font-bold text-green-600">OPTIMAL</span>
           </div>
        </div>
      </header>

      <section className="space-y-20">
        {/* Daily Executive Briefing */}
        <div className="space-y-6">
           <div className="flex items-center gap-4 px-4">
              <Target size={20} className="text-gray-400" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">The Showrunner's Directive</h2>
           </div>
           <DailyBriefing />
        </div>

        {/* ROI Modeling Suite */}
        <div className="space-y-6">
           <div className="flex items-center gap-4 px-4">
              <TrendingUp size={20} className="text-gray-400" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Conversion & Impact Simulations</h2>
           </div>
           <ROIModelingDashboard />
        </div>

        {/* Global Market Intelligence */}
        <div className="space-y-6">
           <div className="flex items-center gap-4 px-4">
              <Globe size={20} className="text-gray-400" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Competitive Landscape & Trend Benchmarking</h2>
           </div>
           <MarketIntel />
        </div>
      </section>

      <footer className="pt-20 pb-10 text-center opacity-30">
         <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
           FashionOS Intelligence Lab • v2.5.0 • System Status: Nominal
         </p>
      </footer>
    </div>
  );
};