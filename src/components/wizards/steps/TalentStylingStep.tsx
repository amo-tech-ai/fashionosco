
import React from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { User, Scissors, CheckCircle, Star } from 'lucide-react';

export const TalentStylingStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useShootWizard();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Talent & Styling.</h2>
        <p className="text-gray-500 font-light">Who and what do you need on set?</p>
      </div>
      
      {/* Preferred Talent Banner */}
      {state.preferredTalent && (
         <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl flex items-center gap-4 animate-in slide-in-from-top-2">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
               <Star size={20} fill="currentColor" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-purple-900">Talent Request Active</h4>
               <p className="text-xs text-purple-700">You are requesting to book <strong>{state.preferredTalent}</strong>. We will confirm their availability.</p>
            </div>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         {/* Model Selection */}
         <div className={`p-6 rounded-xl border transition-all duration-300 ${state.modelNeeded ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 bg-white'}`}>
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                     <User size={20} />
                  </div>
                  <h3 className="font-bold text-lg">Professional Model</h3>
               </div>
               <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input 
                     type="checkbox" 
                     name="toggle" 
                     id="model-toggle" 
                     checked={state.modelNeeded}
                     onChange={(e) => updateField('modelNeeded', e.target.checked)}
                     className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                     style={{ right: state.modelNeeded ? '0' : 'auto', left: state.modelNeeded ? 'auto' : '0', borderColor: state.modelNeeded ? '#000' : '#ccc' }}
                  />
                  <label htmlFor="model-toggle" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${state.modelNeeded ? 'bg-black' : 'bg-gray-300'}`}></label>
               </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">Access our directory of agency-signed models. Includes usage rights for web.</p>
            
            {state.modelNeeded && (
               <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center gap-3 cursor-pointer hover:border-black transition-colors" onClick={() => updateField('modelSelection', 'portfolio')}>
                     <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
                     </div>
                     <span className="text-sm font-medium">Select from Portfolio</span>
                  </div>
                  <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center gap-3 cursor-pointer hover:border-black transition-colors" onClick={() => updateField('modelSelection', 'studio-books')}>
                     <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs">OS</div>
                     <span className="text-sm font-medium">Let Studio Book</span>
                  </div>
               </div>
            )}
         </div>

         {/* Styling Selection */}
         <div className={`p-6 rounded-xl border transition-all duration-300 ${state.stylingNeeded === 'stylist' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 bg-white'}`}>
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                     <Scissors size={20} />
                  </div>
                  <h3 className="font-bold text-lg">Wardrobe Stylist</h3>
               </div>
               <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input 
                     type="checkbox" 
                     id="stylist-toggle" 
                     checked={state.stylingNeeded === 'stylist'}
                     onChange={(e) => updateField('stylingNeeded', e.target.checked ? 'stylist' : 'own-wardrobe')}
                     className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                     style={{ right: state.stylingNeeded === 'stylist' ? '0' : 'auto', left: state.stylingNeeded === 'stylist' ? 'auto' : '0', borderColor: state.stylingNeeded === 'stylist' ? '#000' : '#ccc' }}
                  />
                  <label htmlFor="stylist-toggle" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${state.stylingNeeded === 'stylist' ? 'bg-black' : 'bg-gray-300'}`}></label>
               </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">Expert steaming, pinning, and outfit coordination on set.</p>
            
            {state.stylingNeeded === 'stylist' && (
               <div className="p-3 bg-purple-50 text-purple-700 text-xs rounded-lg animate-in fade-in flex items-center gap-2">
                  <CheckCircle size={14} /> Stylist added to your package (+$700/day).
               </div>
            )}
         </div>

      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Continue</Button>
      </div>
    </div>
  );
};
