
import React from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { Calendar, MapPin, Clock } from 'lucide-react';

export const ShootDetailsStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useShootWizard();

  // Simple validation
  const isValid = state.numberOfItems > 0 && state.location;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Tell us about your shoot.</h2>
        <p className="text-gray-500 font-light">We need a few details to estimate the duration and logistics.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        
        {/* Item Count */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Number of Looks / Products</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={state.numberOfItems} 
              onChange={(e) => updateField('numberOfItems', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="w-16 h-12 flex items-center justify-center border border-gray-300 rounded-md font-serif text-xl font-bold">
               {state.numberOfItems}
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-purple-600 bg-purple-50 p-3 rounded-lg">
             <Clock size={16} className="mr-2" />
             Estimated Duration: <span className="font-bold ml-1">{state.numberOfItems > 20 ? 'Full Day (8h)' : 'Half Day (4h)'}</span>
          </div>
        </div>

        {/* Location Selection */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
           <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Shoot Location</label>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                 { id: 'studio', label: 'FashionOS Studio', desc: 'North London' },
                 { id: 'on-location', label: 'On Location', desc: 'Outdoor / Scouted' },
                 { id: 'client-venue', label: 'Client Venue', desc: 'Your Office/Store' }
              ].map((loc) => (
                 <button
                    key={loc.id}
                    onClick={() => updateField('location', loc.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                       state.location === loc.id 
                       ? 'border-black bg-gray-50 ring-1 ring-black' 
                       : 'border-gray-200 hover:border-gray-400'
                    }`}
                 >
                    <MapPin size={20} className={`mb-3 ${state.location === loc.id ? 'text-black' : 'text-gray-400'}`} />
                    <div className="font-bold text-sm">{loc.label}</div>
                    <div className="text-xs text-gray-500">{loc.desc}</div>
                 </button>
              ))}
           </div>
        </div>

        {/* Date Selection (Mock) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 opacity-80 cursor-not-allowed relative">
           <div className="absolute inset-0 z-10 bg-white/50"></div>
           <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Preferred Date</label>
           <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
              <Calendar size={18} className="text-gray-400" />
              <span className="text-sm text-gray-500">Availability calendar will load after deposit.</span>
           </div>
        </div>

      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep} disabled={!isValid}>Continue</Button>
      </div>
    </div>
  );
};
