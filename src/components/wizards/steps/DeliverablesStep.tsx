
import React, { useState } from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { Sparkles, Layers, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { generateShotList } from '../../../services/ai/shotList';
import { Shot } from '../../../types/ai';

export const DeliverablesStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useShootWizard();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateShotList = async () => {
    setIsGenerating(true);
    setError(null);
    try {
       const shots = await generateShotList({
          shootType: state.shootType || 'custom',
          numberOfItems: state.numberOfItems,
          vibe: state.vibe || 'editorial',
          referenceBrands: state.referenceBrands || 'Standard',
          turnaround: state.turnaround
       });
       updateField('shotList', shots);
    } catch (err) {
       setError("Couldn't generate shot list. Please try again.");
    } finally {
       setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Deliverables.</h2>
        <p className="text-gray-500 font-light">What do you need at the end of the day?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         <div className="space-y-6">
            {/* Image Count */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Final Retouched Images</label>
               <div className="flex items-center gap-4">
                  <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="5"
                  value={state.finalImagesCount} 
                  onChange={(e) => updateField('finalImagesCount', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="w-16 h-12 flex items-center justify-center border border-gray-300 rounded-md font-serif text-xl font-bold">
                     {state.finalImagesCount}
                  </div>
               </div>
            </div>

            {/* Resolution */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Resolution</label>
               <div className="grid grid-cols-2 gap-4">
                  <button 
                     onClick={() => updateField('resolution', 'web')}
                     className={`p-3 rounded-lg border text-sm font-medium transition-all ${state.resolution === 'web' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                  >
                     Web (72 DPI)
                  </button>
                  <button 
                     onClick={() => updateField('resolution', 'print')}
                     className={`p-3 rounded-lg border text-sm font-medium transition-all ${state.resolution === 'print' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                  >
                     Print (300 DPI)
                  </button>
               </div>
            </div>
         </div>

         {/* AI Shot List Preview */}
         <div className="bg-gradient-to-br from-[#F7F7F5] to-white border border-gray-200 rounded-xl p-6 flex flex-col h-full shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 relative z-10">
               <div className="flex items-center gap-2">
                  <div className="bg-black text-white p-1 rounded-md">
                    <Sparkles size={14} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">AI Shot List Builder</span>
               </div>
               {state.shotList.length === 0 && (
                  <Button onClick={handleGenerateShotList} isLoading={isGenerating} className="text-xs h-8 px-3">
                     Generate List
                  </Button>
               )}
            </div>

            <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden relative min-h-[300px] z-10">
               {isGenerating && (
                  <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                     <Loader2 className="animate-spin text-black mb-3 w-8 h-8" />
                     <p className="text-xs font-bold uppercase tracking-widest text-gray-500 animate-pulse">Gemini Thinking...</p>
                  </div>
               )}
               
               {state.shotList.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                     <Layers size={32} className="mb-4 opacity-50" />
                     <p className="text-xs max-w-[200px] leading-relaxed">
                        Click 'Generate List' to let Gemini 3 Pro draft a tailored shot list based on your creative direction.
                     </p>
                  </div>
               ) : (
                  <div className="divide-y divide-gray-100 overflow-y-auto max-h-[350px] p-2 custom-scrollbar">
                     {state.shotList.map((shot: Shot, idx: number) => (
                        <div key={idx} className="p-4 hover:bg-gray-50 rounded-lg transition-colors group animate-in slide-in-from-bottom-2" style={{ animationDelay: `${idx * 50}ms` }}>
                           <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-sm text-gray-900">{shot.name}</span>
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                 shot.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                              }`}>
                                 {shot.priority}
                              </span>
                           </div>
                           <p className="text-xs text-gray-500 leading-relaxed mb-2">{shot.description}</p>
                           <div className="flex gap-2 flex-wrap">
                              <span className="text-[10px] text-gray-400 border border-gray-100 px-1.5 rounded">{shot.angle}</span>
                              <span className="text-[10px] text-gray-400 border border-gray-100 px-1.5 rounded">{shot.lighting}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
            
            {state.shotList.length > 0 && (
               <div className="mt-4 flex justify-between items-center px-2 relative z-10">
                  <span className="text-xs text-gray-400">{state.shotList.length} Shots Generated</span>
                  <button onClick={handleGenerateShotList} className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-purple-600 transition-colors">
                     <RefreshCw size={12} /> Regenerate
                  </button>
               </div>
            )}
            
            {error && (
               <div className="flex items-center gap-2 mt-2 text-xs text-red-500 justify-center relative z-10">
                  <AlertCircle size={14} />
                  <span>{error}</span>
               </div>
            )}
            
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50 z-0"></div>
         </div>

      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Continue</Button>
      </div>
    </div>
  );
};
