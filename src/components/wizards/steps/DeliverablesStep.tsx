
import React, { useState, useMemo } from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { Sparkles, Layers, Loader2, AlertCircle, FileText } from 'lucide-react';
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
        // Pass selected inventory
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
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Deliverables.</h2>
        <p className="text-gray-500 font-light">What do you need at the end of the day?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Controls */}
        <div className="lg:col-span-4 space-y-6">
          <DeliverablesControls
            finalImagesCount={state.finalImagesCount}
            resolution={state.resolution}
            onUpdate={updateField}
          />
          <PropSummary props={uniqueProps} />
          
          {/* Export Actions Sidebar */}
          {state.shotList.length > 0 && (
             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Export Options</label>
                <button 
                   onClick={handleDownloadPDF}
                   className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-800 hover:bg-gray-50 hover:border-black transition-all shadow-sm mb-3"
                >
                   <FileText size={16} /> Download Call Sheet
                </button>
             </div>
          )}
        </div>

        {/* Right Column: AI Shot List Preview */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#F7F7F5] to-white border border-gray-200 rounded-xl p-6 flex flex-col h-full shadow-sm relative overflow-hidden min-h-[600px]">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white p-1 rounded-md">
                <Sparkles size={14} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">
                AI Shot List Builder
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleGenerateShotList(false)}
                isLoading={isGenerating}
                className="text-xs h-8 px-3"
              >
                {state.shotList.length > 0 ? 'Regenerate All' : 'Generate List'}
              </Button>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden relative flex flex-col z-10">
            {isGenerating && (
              <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                <Loader2 className="animate-spin text-black mb-3 w-8 h-8" />
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 animate-pulse">
                  Gemini Thinking...
                </p>
              </div>
            )}

            {state.shotList.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <Layers size={32} className="mb-4 opacity-50" />
                <p className="text-xs max-w-[200px] leading-relaxed">
                  Click 'Generate List' to let Gemini 3 Pro draft a tailored shot list based on your {state.selectedProducts.length > 0 ? `${state.selectedProducts.length} selected products` : 'details'}.
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

          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50 z-0"></div>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant="secondary" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Continue</Button>
      </div>
    </div>
  );
};
