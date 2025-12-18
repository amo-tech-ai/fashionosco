import React from 'react';
import { useShootWizard } from '../../../../contexts/ShootWizardContext';
import { Check, Edit2, TrendingUp, Layout, Camera, Video, ArrowRight } from 'lucide-react';
import { Button } from '../../../Button';

export const StrategySummary: React.FC = () => {
  const { state, dispatch } = useShootWizard();

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Top Controls */}
      <div className="flex justify-between items-end mb-12 pb-8 border-b border-gray-100">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-purple-600 mb-2 block">Strategic Plan Generated</span>
          <h1 className="text-5xl font-serif">Campaign Brief.</h1>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-full">
          <button 
            onClick={() => state.isAdjustMode && dispatch({ type: 'TOGGLE_ADJUST' })}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${!state.isAdjustMode ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-black'}`}
          >
            AI Recommended
          </button>
          <button 
            onClick={() => !state.isAdjustMode && dispatch({ type: 'TOGGLE_ADJUST' })}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${state.isAdjustMode ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-black'}`}
          >
            Adjust Mode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Core Strategy */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Strategy Card */}
          <div className="luxury-card p-10 bg-[#0A0A0A] text-white">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-3xl font-serif">The Vision</h3>
              <TrendingUp className="text-purple-400" />
            </div>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
              "We recommend a <span className="text-white font-bold italic">Cinematic Minimalist</span> campaign focusing on textured shadows to elevate the luxury perception of your knitwear collection. This aligns with current Vogue trends and offsets your competitor's high-key approach."
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10">High Impact ROI</div>
              <div className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10">PDP Focused</div>
            </div>
          </div>

          {/* Shot List Summary */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Layout size={14} /> Planned Deliverables
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="luxury-card p-6 flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Camera size={20} />
                </div>
                <div>
                  <div className="font-bold text-lg mb-1">12 Editorial Stills</div>
                  <p className="text-xs text-gray-500 leading-relaxed">Focus on detail and silhouette for campaign hero spots.</p>
                </div>
              </div>
              <div className="luxury-card p-6 flex items-start gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <Video size={20} />
                </div>
                <div>
                  <div className="font-bold text-lg mb-1">5 High-Res Reels</div>
                  <p className="text-xs text-gray-500 leading-relaxed">9:16 format with trending audio suggestions for IG reach.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: ROI & Metadata */}
        <div className="lg:col-span-4 space-y-8">
          <div className="luxury-card p-8 bg-purple-50 border-purple-100">
            <h4 className="text-xs font-black uppercase tracking-widest text-purple-400 mb-6">Directional Impact</h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Engagement Potential</span>
                  <span className="text-purple-600">High</span>
                </div>
                <div className="h-1 bg-purple-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Conversion Lift</span>
                  <span className="text-purple-600">Medium</span>
                </div>
                <div className="h-1 bg-purple-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 w-[60%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="luxury-card p-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Distribution Matrix</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm">Instagram</span>
                <Check size={14} className="text-green-500" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm">Shopify PDP</span>
                <Check size={14} className="text-green-500" />
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">TikTok Ads</span>
                <Check size={14} className="text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xl px-6 z-50">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-100 p-4 rounded-3xl shadow-2xl flex gap-4 items-center">
          <div className="flex-1 pl-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Production Budget</div>
            <div className="text-2xl font-serif font-bold text-black">$4,500 <span className="text-xs font-sans text-gray-400 ml-1">Est.</span></div>
          </div>
          <Button onClick={() => dispatch({ type: 'SET_STEP', step: 'review' })} className="px-8 py-4 rounded-2xl">
            Approve & Book <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};