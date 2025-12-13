
import React from 'react';
import { useEventWizard } from '../../../contexts/EventWizardContext';
import { Button } from '../../Button';
import { Users, MapPin, Calendar } from 'lucide-react';

export const EventDetailsStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useEventWizard();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h2 className="font-serif text-4xl mb-3">Logistics & Venue.</h2>
        <p className="text-gray-500">Define the scale and setting.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Event Name</label>
               <input 
                  type="text" 
                  value={state.eventName}
                  onChange={(e) => updateField('eventName', e.target.value)}
                  placeholder="e.g. SS25 Press Day"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
               />
            </div>

            <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Estimated Guest Count</label>
               <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <Users className="text-gray-400" />
                  <input 
                     type="range" 
                     min="50" 
                     max="1000" 
                     step="50"
                     value={state.guestCount}
                     onChange={(e) => updateField('guestCount', parseInt(e.target.value))}
                     className="w-full accent-black"
                  />
                  <span className="font-serif text-xl font-bold w-16 text-right">{state.guestCount}</span>
               </div>
            </div>

            <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Venue Style</label>
               <div className="grid grid-cols-2 gap-3">
                  {['industrial', 'historical', 'modern', 'outdoor'].map((v) => (
                     <button 
                        key={v}
                        onClick={() => updateField('venueType', v)}
                        className={`p-3 rounded-lg border text-sm font-medium capitalize ${state.venueType === v ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-600 hover:border-black'}`}
                     >
                        {v}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="bg-gray-100 rounded-xl p-8 flex flex-col justify-center items-center text-center">
            <MapPin size={48} className="text-gray-300 mb-4" />
            <h3 className="font-bold text-lg mb-2">Location Scouting</h3>
            <p className="text-sm text-gray-500">
               Based on your selection, FashionOS will recommend available venues in London/Paris matching your capacity of {state.guestCount}.
            </p>
         </div>
      </div>

      <div className="pt-8 flex justify-between border-t border-gray-100">
         <Button variant="secondary" onClick={prevStep}>Back</Button>
         <Button onClick={nextStep} disabled={!state.eventName || !state.venueType}>Continue</Button>
      </div>
    </div>
  );
};
