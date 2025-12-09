
import React from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { Video, Wand2, ShieldCheck, Clock, Info } from 'lucide-react';

const InfoTooltip = ({ text }: { text: string }) => (
  <div className="group relative inline-flex items-center ml-2">
    <Info size={14} className="text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl leading-relaxed">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
  </div>
);

export const AddOnsStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useShootWizard();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Final Touches.</h2>
        <p className="text-gray-500 font-light">Add enhancements and manage usage rights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
         {/* Video Add-on */}
         <div 
            onClick={() => updateField('videoAddOn', !state.videoAddOn)}
            className={`cursor-pointer p-6 rounded-xl border transition-all ${state.videoAddOn ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 bg-white hover:border-gray-300'}`}
         >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 mb-4">
               <Video size={20} className={state.videoAddOn ? 'text-black' : 'text-gray-400'} />
            </div>
            <h3 className="font-bold text-lg mb-2">BTS & Social Video</h3>
            <p className="text-sm text-gray-500 mb-4">Add a dedicated videographer to capture Reels and BTS content.</p>
            <span className="text-sm font-bold">+$500</span>
         </div>

         {/* Turnaround Time */}
         <div className="p-6 rounded-xl border border-gray-200 bg-white md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
               <Clock className="text-black" />
               <h3 className="font-bold text-lg">Turnaround Time</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                  { id: 'rush', label: 'Rush (48h)', multiplier: '1.3x', desc: 'Jump the queue' },
                  { id: 'standard', label: 'Standard (5-7 Days)', multiplier: '1.0x', desc: 'Regular delivery' },
                  { id: 'extended', label: 'Extended (14 Days)', multiplier: '0.9x', desc: 'Save 10%' }
               ].map((opt) => (
                  <button
                     key={opt.id}
                     onClick={() => updateField('turnaround', opt.id)}
                     className={`p-4 rounded-lg border text-left transition-all relative overflow-hidden ${
                        state.turnaround === opt.id 
                        ? 'border-green-600 bg-green-50 text-green-900' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                     }`}
                  >
                     <div className="font-bold text-sm mb-1">{opt.label}</div>
                     <div className="text-xs opacity-70 mb-2">{opt.desc}</div>
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${state.turnaround === opt.id ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                        {opt.multiplier}
                     </span>
                  </button>
               ))}
            </div>
         </div>

         {/* Retouching Level */}
         <div className="p-6 rounded-xl border border-gray-200 bg-white md:col-span-3">
            <div className="flex items-center gap-2 mb-6">
               <Wand2 className="text-black" />
               <h3 className="font-bold text-lg">Retouching Level</h3>
               <InfoTooltip text="Choose the level of post-production polish. Basic covers lighting/color. Advanced adds skin texture work. High-End is magazine quality." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {['basic', 'advanced', 'high-end'].map((level) => (
                  <button
                     key={level}
                     onClick={() => updateField('retouchingLevel', level)}
                     className={`p-4 rounded-lg border text-left transition-all ${
                        state.retouchingLevel === level 
                        ? 'border-purple-600 bg-purple-50 text-purple-900' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                     }`}
                  >
                     <div className="font-bold capitalize text-sm mb-1">{level.replace('-', ' ')}</div>
                     <div className="text-xs opacity-70">
                        {level === 'basic' ? 'Color correction & crop' : level === 'advanced' ? 'Skin cleanup & shaping' : 'Compositing & high-end beauty'}
                     </div>
                  </button>
               ))}
            </div>
         </div>

         {/* Usage Rights */}
         <div className="p-6 rounded-xl border border-gray-200 bg-white md:col-span-3">
            <div className="flex items-center gap-2 mb-6">
               <ShieldCheck className="text-black" />
               <h3 className="font-bold text-lg">Usage Rights</h3>
               <InfoTooltip text="Defines where you can legally use the images. Editorial is for social/blogs. Commercial adds paid ads/web. Unlimited is global perpetuity." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                  { id: 'editorial', label: 'Editorial / Social', cost: '1x' },
                  { id: 'commercial', label: 'Commercial Web', cost: '1.5x' },
                  { id: 'unlimited', label: 'Unlimited Global', cost: '2x' }
               ].map((right) => (
                  <button
                     key={right.id}
                     onClick={() => updateField('usageRights', right.id)}
                     className={`p-4 rounded-lg border flex justify-between items-center transition-all ${
                        state.usageRights === right.id 
                        ? 'border-blue-600 bg-blue-50 text-blue-900' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                     }`}
                  >
                     <span className="font-medium text-sm">{right.label}</span>
                     <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-gray-100">{right.cost}</span>
                  </button>
               ))}
            </div>
         </div>

      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Review Booking</Button>
      </div>
    </div>
  );
};
