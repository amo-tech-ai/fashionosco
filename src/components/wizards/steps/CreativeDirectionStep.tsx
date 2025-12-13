
import React, { useState, useRef } from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { Upload, Sparkles, Loader2, CheckCircle2, Search, ExternalLink, Palette, Sun, Box, Feather, Eye, Zap, Image as ImageIcon, Crop } from 'lucide-react';
import { analyzeMoodBoard } from '../../../services/ai/moodBoard';
import { VibeType } from '../../../types/wizard';

export const CreativeDirectionStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useShootWizard();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files) as File[];
      updateField('moodBoardImages', [...state.moodBoardImages, ...files]);
      
      // Auto-analyze after first upload
      if (!state.aiAnalysis) {
        setIsAnalyzing(true);
        try {
          const analysis = await analyzeMoodBoard(files);
          updateField('aiAnalysis', analysis);
          
          // Auto-select vibe if high confidence match found
          if (analysis.keywords && analysis.keywords.length > 0) {
             const firstKeyword = analysis.keywords[0].toLowerCase();
             const validVibes = ['minimalist', 'editorial', 'bold', 'dark', 'natural'];
             const match = validVibes.find(v => firstKeyword.includes(v));
             if (match) updateField('vibe', match as VibeType);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsAnalyzing(false);
        }
      }
    }
  };

  // Helper to get icon for keyword
  const getKeywordIcon = (keyword: string) => {
     const k = keyword.toLowerCase();
     if (k.includes('minimal')) return <Feather size={10} />;
     if (k.includes('bold') || k.includes('contrast')) return <Zap size={10} />;
     if (k.includes('nature') || k.includes('organic')) return <Sun size={10} />;
     return <Eye size={10} />;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Share your creative vision.</h2>
        <p className="text-gray-500 font-light">Upload references to unlock AI-powered aesthetic insights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Upload Section */}
         <div className="space-y-6">
            <div 
               onClick={() => fileInputRef.current?.click()}
               className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-black transition-all cursor-pointer min-h-[300px] relative group"
            >
               <input 
                 type="file" 
                 multiple 
                 accept="image/*" 
                 className="hidden" 
                 ref={fileInputRef}
                 onChange={handleFileUpload}
               />
               
               {state.moodBoardImages.length > 0 ? (
                 <div className="grid grid-cols-3 gap-2 w-full animate-in fade-in">
                    {state.moodBoardImages.slice(0, 5).map((file, i) => (
                       <div key={i} className="aspect-square bg-gray-100 rounded overflow-hidden relative shadow-sm">
                          <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="preview" />
                       </div>
                    ))}
                    <div className="aspect-square bg-gray-50 rounded flex items-center justify-center border border-gray-200 text-gray-400">
                        <Upload size={20} />
                    </div>
                 </div>
               ) : (
                 <>
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400 group-hover:scale-110 transition-transform">
                        <ImageIcon size={24} />
                    </div>
                    <h3 className="font-bold text-sm text-gray-900">Upload Reference Images</h3>
                    <p className="text-xs text-gray-500 mt-2 max-w-xs">Drag and drop or click to browse. (JPG, PNG)</p>
                    <Button variant="secondary" className="mt-6 text-xs h-8 pointer-events-none">Browse Files</Button>
                 </>
               )}
            </div>

            {/* Vibe Manual Selection */}
            <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Or Select a Vibe</label>
               <div className="flex flex-wrap gap-2">
                  {['minimalist', 'editorial', 'bold', 'dark', 'natural'].map((vibe) => (
                     <button
                        key={vibe}
                        onClick={() => updateField('vibe', vibe as VibeType)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                           state.vibe === vibe 
                           ? 'bg-black text-white border-black' 
                           : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                     >
                        {vibe.charAt(0).toUpperCase() + vibe.slice(1)}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         {/* AI Analysis Result */}
         <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl p-6 relative overflow-hidden flex flex-col h-full min-h-[400px]">
            <div className="flex items-center gap-2 mb-6">
               <Sparkles className="text-purple-600" size={20} />
               <span className="text-xs font-bold uppercase tracking-widest text-purple-800">Gemini Vision Analysis</span>
            </div>

            {isAnalyzing ? (
               <div className="flex-1 flex flex-col items-center justify-center">
                  <Loader2 className="animate-spin text-purple-600 w-8 h-8 mb-4" />
                  <p className="text-sm font-medium text-purple-900">Analyzing composition & palettes...</p>
               </div>
            ) : !state.aiAnalysis ? (
               <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
                  <p className="text-sm text-purple-900 max-w-[200px] leading-relaxed">
                     Upload images to see AI-powered breakdown of lighting, color, and style.
                  </p>
               </div>
            ) : (
               <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 flex-1 overflow-y-auto custom-scrollbar">
                  
                  {/* Suggestion - Prominent */}
                  <div className="bg-gradient-to-r from-white to-purple-50 p-6 rounded-lg border border-purple-200 shadow-sm relative">
                     <div className="absolute -top-3 -left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">AI SUGGESTION</div>
                     <p className="text-sm font-medium text-purple-900 leading-relaxed italic">
                        "{state.aiAnalysis.suggestion}"
                     </p>
                  </div>

                  {/* New Prominent Style Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-purple-600">
                           <Sun size={16} />
                           <h4 className="text-xs font-bold uppercase tracking-widest">Lighting</h4>
                        </div>
                        <p className="text-sm text-gray-700 font-medium leading-snug">{state.aiAnalysis.lightingStyle}</p>
                     </div>
                     <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-purple-600">
                           <Crop size={16} />
                           <h4 className="text-xs font-bold uppercase tracking-widest">Composition</h4>
                        </div>
                        <p className="text-sm text-gray-700 font-medium leading-snug">{state.aiAnalysis.compositionStyle || "Balanced & Centered"}</p>
                     </div>
                  </div>

                  {/* Palette */}
                  <div className="bg-white/50 p-4 rounded-lg border border-purple-100/50">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-3 flex items-center gap-2"><Palette size={12}/> Detected Palette</h4>
                     <div className="flex gap-3">
                        {state.aiAnalysis.colors.map((c: string, i: number) => (
                           <div key={i} className="group relative">
                              <div className="w-12 h-12 rounded-full shadow-sm border-2 border-white ring-1 ring-black/5 hover:scale-110 transition-transform cursor-help" style={{ backgroundColor: c }}></div>
                              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 opacity-0 group-hover:opacity-100 bg-white px-1 rounded shadow-sm whitespace-nowrap z-10">{c}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  {/* Keywords */}
                  <div>
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-3">Aesthetic Profile</h4>
                     <div className="flex gap-2 flex-wrap">
                        {state.aiAnalysis.keywords.map((k: string, i: number) => (
                           <span key={i} className="px-3 py-1.5 bg-white border border-purple-100 rounded-md text-xs font-medium text-purple-900 shadow-sm flex items-center gap-1.5">
                              {getKeywordIcon(k)}
                              {k}
                           </span>
                        ))}
                     </div>
                  </div>
                  
                  {/* Brand Refs */}
                  {state.aiAnalysis.similarBrands && state.aiAnalysis.similarBrands.length > 0 && (
                     <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2 flex items-center gap-1"><Search size={10}/> Brand References</h4>
                        <div className="flex gap-2 flex-wrap">
                           {state.aiAnalysis.similarBrands.map((b: string, i: number) => (
                              <a 
                                 key={i} 
                                 href={`https://www.google.com/search?q=${encodeURIComponent(b + " fashion brand aesthetic")}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="px-3 py-1.5 bg-purple-50 text-purple-800 rounded text-xs font-bold border border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-colors flex items-center gap-1 group"
                              >
                                 {b}
                                 <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" />
                              </a>
                           ))}
                        </div>
                     </div>
                  )}
                  
                  <div className="pt-2 flex items-center text-xs text-green-600 font-medium">
                     <CheckCircle2 size={14} className="mr-1" />
                     Analysis Saved to Brief
                  </div>
               </div>
            )}
         </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep} disabled={!state.vibe && !state.aiAnalysis}>Continue</Button>
      </div>
    </div>
  );
};
