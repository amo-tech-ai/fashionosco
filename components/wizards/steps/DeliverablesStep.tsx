
import React, { useState, useMemo } from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
// Fix: Added missing import for ButtonVariant to resolve the error on line 184
import { ButtonVariant } from '../../../types';
import { Sparkles, Layers, Loader2, AlertCircle, FileText, Wand2 } from 'lucide-react';
import { generateShotList } from '../../../services/ai/shotList';
import { generateCallSheetPDF } from '../../../services/pdf/callSheet';
import { Shot } from '../../../types/ai';

// Modular Sub-components
import { DeliverablesControls } from './deliverables/DeliverablesControls';
import { PropSummary } from './deliverables/PropSummary';
import { ShotList } from './deliverables/ShotList';
import { RefinementBar } from './deliverables/RefinementBar';

export const DeliverablesStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useShootWizard();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refinementText, setRefinementText] = useState('');

  // Derived Prop List
  const uniqueProps = useMemo(() => {
    const all = state.shotList
      .flatMap((s) => (s.props ? s.props.split(',').map((p) => p.trim()) : []))
      .filter((p) => p && p.toLowerCase() !== 'none' && p.toLowerCase() !== 'n/a');
    return Array.from(new Set(all));
  }, [state.shotList]);

  const handleGenerateShotList = async (isRefinement = false) => {
    setIsGenerating(true);
    setError(null);
    try {
      let derivedVibe = state.vibe || 'editorial';
      if (state.aiAnalysis) {
        derivedVibe += `. Style keywords: ${state.aiAnalysis.keywords.join(
          ', '
        )}. Lighting: ${state.aiAnalysis.lightingStyle}`;
      }

      const shots = await generateShotList({
        shootType: state.shootType || 'custom',
        numberOfItems: state.numberOfItems,
        vibe: derivedVibe,
        referenceBrands:
          state.referenceBrands ||
          (state.aiAnalysis?.similarBrands?.join(', ') || 'Standard'),
        turnaround: state.turnaround,
        refinement: isRefinement ? refinementText : undefined,
        currentShots: isRefinement ? state.shotList : undefined,
        products: state.selectedProducts.length > 0 ? state.selectedProducts : undefined
      });

      updateField('shotList', shots);
      if (isRefinement) setRefinementText('');
    } catch (err) {
      setError("Couldn't generate shot list. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    generateCallSheetPDF(state);
  };

  const updateShotList = (newShots: Shot[]) => {
    updateField('shotList', newShots);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <div className="flex items-center gap-2 mb-2">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900">Deliverables.</h2>
            <div className="p-1 bg-purple-50 text-purple-600 rounded-md animate-pulse">
                <Sparkles size={18} />
            </div>
        </div>
        <p className="text-gray-500 font-light">Define your assets and generate a prioritized production plan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-10 transition duration-500"></div>
            <DeliverablesControls
                finalImagesCount={state.finalImagesCount}
                resolution={state.resolution}
                onUpdate={updateField}
            />
          </div>
          <PropSummary props={uniqueProps} />
          
          {/* Export Actions Sidebar */}
          {state.shotList.length > 0 && (
             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Export Pipeline</label>
                <button 
                   onClick={handleDownloadPDF}
                   className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-all shadow-sm mb-3"
                >
                   <FileText size={16} /> Download Call Sheet
                </button>
                <button 
                   className="w-full flex items-center justify-center gap-2 p-3 bg-gray-50 border border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-400 cursor-not-allowed"
                >
                   <Wand2 size={16} /> Auto-Sync to Shopify
                </button>
             </div>
          )}
        </div>

        {/* Right Column: AI Shot List Preview */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#FDFCFB] to-white border border-gray-200 rounded-2xl p-6 flex flex-col h-full shadow-sm relative overflow-hidden min-h-[600px]">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="bg-[#111111] text-white p-1.5 rounded-lg">
                <Sparkles size={14} className="text-purple-300" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]">
                AI Intelligence Engine
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleGenerateShotList(false)}
                isLoading={isGenerating}
                className="text-[10px] h-9 px-4"
              >
                {state.shotList.length > 0 ? 'Regenerate Brief' : 'Draft Brief with AI'}
              </Button>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden relative flex flex-col z-10">
            {isGenerating && (
              <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="relative">
                    <Loader2 className="animate-spin text-black mb-3 w-10 h-10" />
                    <Sparkles className="absolute top-0 right-0 w-4 h-4 text-purple-600 animate-pulse" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 animate-pulse mt-4">
                  Gemini reasoning...
                </p>
              </div>
            )}

            {state.shotList.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-50/50">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-6">
                    <Layers size={24} className="opacity-30" />
                </div>
                <p className="text-sm font-medium text-gray-500 max-w-[250px] leading-relaxed">
                  Connect your collection data to generate a machine-optimized production plan.
                </p>
              </div>
            ) : (
              <>
                <ShotList shots={state.shotList} onUpdateList={updateShotList} />
                <RefinementBar
                  value={refinementText}
                  onChange={setRefinementText}
                  onSubmit={() => handleGenerateShotList(true)}
                  isGenerating={isGenerating}
                />
              </>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 mt-2 text-xs text-red-500 justify-center relative z-10">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-100/30 rounded-full blur-3xl z-0"></div>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant={ButtonVariant.SECONDARY} onClick={prevStep} className="px-8">
          Back
        </Button>
        <Button onClick={nextStep} className="px-10">Continue to Review</Button>
      </div>
    </div>
  );
};
