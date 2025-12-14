
import React, { useEffect, useState, useRef } from 'react';
import { BrandInput, BrandAuditResult } from '../../../../types/brand';
import { auditBrand } from '../../../../services/ai/brandAudit';
import { Search, Globe, Database, Sparkles } from 'lucide-react';
import { BrandReport } from './BrandReport';

interface AnalysisStepProps {
  input: BrandInput;
}

export const AnalysisStep: React.FC<AnalysisStepProps> = ({ input }) => {
  const [status, setStatus] = useState<'scanning' | 'researching' | 'analyzing' | 'complete' | 'error'>('scanning');
  const [result, setResult] = useState<BrandAuditResult | null>(null);
  const [scanText, setScanText] = useState('Initializing agents...');
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    performAudit();
    hasRunRef.current = true;
  }, []);

  const performAudit = async () => {
    // Phase 1: Digital Footprint
    setStatus('scanning');
    setScanText(`Connecting to ${input.websiteUrl}...`);
    await new Promise(r => setTimeout(r, 1200));
    
    // Phase 2: Deep Research (Simulated UI while API calls)
    setStatus('researching');
    setScanText('Cross-referencing press, reviews, and market positioning...');
    
    // Start API Call
    const auditPromise = auditBrand(input);
    
    // Aesthetic delay to let the user read the "Researching" state
    await new Promise(r => setTimeout(r, 2000));

    // Phase 3: Synthesis
    setStatus('analyzing');
    setScanText('Synthesizing brand identity and strategic opportunities...');

    try {
      const data = await auditPromise;
      setResult(data);
      await new Promise(r => setTimeout(r, 800)); // Smooth transition
      setStatus('complete');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  if (status !== 'complete') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-500">
        <div className="relative">
          {/* Animated Rings */}
          <div className={`absolute inset-0 rounded-full border-2 border-dashed border-gray-200 animate-[spin_10s_linear_infinite] ${status === 'analyzing' ? 'border-purple-200' : ''}`}></div>
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-gray-300 animate-[spin_8s_linear_infinite_reverse]"></div>
          
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-sm relative z-10">
             {status === 'scanning' && <Globe className="w-10 h-10 text-blue-500 animate-pulse" />}
             {status === 'researching' && <Database className="w-10 h-10 text-orange-500 animate-pulse" />}
             {status === 'analyzing' && <Sparkles className="w-10 h-10 text-purple-600 animate-pulse" />}
             {status === 'error' && <Search className="w-10 h-10 text-red-500" />}
          </div>
        </div>
        
        <div className="space-y-2 max-w-md">
           <h3 className="font-serif text-2xl">
              {status === 'scanning' && 'Scanning Digital Footprint'}
              {status === 'researching' && 'Deep Market Research'}
              {status === 'analyzing' && 'Generating Strategy'}
              {status === 'error' && 'Analysis Failed'}
           </h3>
           <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">{scanText}</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-xs w-full bg-gray-100 h-1 rounded-full overflow-hidden">
           <div className={`h-full transition-all duration-500 ease-out ${
              status === 'scanning' ? 'w-1/3 bg-blue-500' :
              status === 'researching' ? 'w-2/3 bg-orange-500' :
              status === 'analyzing' ? 'w-full bg-purple-600' : 'w-full bg-red-500'
           }`}></div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return <BrandReport initialResult={result} input={input} />;
};
