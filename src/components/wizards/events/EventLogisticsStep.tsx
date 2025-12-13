
import React from 'react';
import { useEventWizard } from '../../../contexts/EventWizardContext';
import { Button } from '../../Button';
import { Shield, Radio, Video, Utensils } from 'lucide-react';

export const EventLogisticsStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useEventWizard();

  const toggle = (field: keyof typeof state) => {
     updateField(field, !state[field]);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h2 className="font-serif text-4xl mb-3">Production Requirements.</h2>
        <p className="text-gray-500">Select the operational elements you need FashionOS to manage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
         <div 
            onClick={() => toggle('avLighting')}
            className={`p-6 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${state.avLighting ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white hover:border-purple-300'}`}
         >
            <div className={`p-3 rounded-full ${state.avLighting ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
               <Radio size={24} />
            </div>
            <div>
               <h3 className="font-bold text-lg">AV & Lighting</h3>
               <p className="text-sm text-gray-500 mt-1">Professional runway lighting, sound systems, and tech crews.</p>
               <div className="mt-3 text-xs font-bold uppercase tracking-widest text-purple-600">+$5,000</div>
            </div>
         </div>

         <div 
            onClick={() => toggle('livestream')}
            className={`p-6 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${state.livestream ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-red-300'}`}
         >
            <div className={`p-3 rounded-full ${state.livestream ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
               <Video size={24} />
            </div>
            <div>
               <h3 className="font-bold text-lg">Global Livestream</h3>
               <p className="text-sm text-gray-500 mt-1">Multi-cam broadcast to Instagram, TikTok, and YouTube.</p>
               <div className="mt-3 text-xs font-bold uppercase tracking-widest text-red-600">+$3,000</div>
            </div>
         </div>

         <div 
            onClick={() => toggle('catering')}
            className={`p-6 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${state.catering ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-orange-300'}`}
         >
            <div className={`p-3 rounded-full ${state.catering ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
               <Utensils size={24} />
            </div>
            <div>
               <h3 className="font-bold text-lg">Catering & Bar</h3>
               <p className="text-sm text-gray-500 mt-1">Canapés and drinks service for {state.guestCount} guests.</p>
               <div className="mt-3 text-xs font-bold uppercase tracking-widest text-orange-600">+${(state.guestCount * 50).toLocaleString()}</div>
            </div>
         </div>

         <div 
            onClick={() => toggle('security')}
            className={`p-6 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${state.security ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}
         >
            <div className={`p-3 rounded-full ${state.security ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
               <Shield size={24} />
            </div>
            <div>
               <h3 className="font-bold text-lg">Security & FOH</h3>
               <p className="text-sm text-gray-500 mt-1">Door management, guest list check-in, and venue security.</p>
               <div className="mt-3 text-xs font-bold uppercase tracking-widest text-blue-600">+$1,500</div>
            </div>
         </div>

      </div>

      <div className="pt-8 flex justify-between border-t border-gray-100">
         <Button variant="secondary" onClick={prevStep}>Back</Button>
         <Button onClick={nextStep}>Review Quote</Button>
      </div>
    </div>
  );
};
