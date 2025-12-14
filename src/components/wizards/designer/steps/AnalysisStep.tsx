
import React, { useEffect, useState, useRef } from 'react';
import { BrandInput, BrandAuditResult } from '../../../../types/brand';
import { auditBrand } from '../../../../services/ai/brandAudit';
import { Search, Globe, Database, Sparkles, RefreshCcw, AlertTriangle } from 'lucide-react';
import { BrandReport } from './BrandReport';
import { Button } from '../../../Button';

interface AnalysisStepProps {
  input: BrandInput;
}

const LOADING_MESSAGES = [
  "Cross-referencing press & reviews...",
  "Analyzing visual consistency...",
  "Identifying market gaps...",
  "Benchmarking against competitors...",
  "Synthesizing strategic advice..."
];

export const AnalysisStep: React.FC<AnalysisStepProps> = ({ input }) => {
  const [status, setStatus] = useState<'scanning' | 'researching' | 'analyzing' | 'complete' | 'error'>('scanning');
  const [result, setResult] = useState<BrandAuditResult | null>(null);
  const [scanText, setScanText] = useState('Initializing agents...');
  const hasRunRef = useRef(false);
  const messageIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (hasRunRef.current) return;
    performAudit();
    hasRunRef.current = true;

    return () => {
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
    };
  }, []);

  const startMessageCycle = () => {
    let i = 0;
    messageIntervalRef.current = window.setInterval(() => {
      setScanText(LOADING_MESSAGES[i % LOADING_MESSAGES.length]);
      i++;
    }, 3000);
  };

  const performAudit = async () => {
    // Phase 1: Digital Footprint
    setStatus('scanning');
    setScanText(`Connecting to ${input.websiteUrl || 'digital footprint'}...`);
    await new Promise(r => setTimeout(r, 1500));
    
    // Phase 2: Deep Research (Simulated UI while API calls)
    setStatus('researching');
    setScanText('deploying research agents...');
    startMessageCycle();
    
    // Start API Call with Timeout Promise
    const auditPromise = auditBrand(input);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Analysis timed out")), 60000)
    );
    
    try {
      // Race the audit against the 60s timeout
      const data = await Promise.race([auditPromise, timeoutPromise]) as BrandAuditResult;
      
      // Phase 3: Synthesis
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
      setStatus('analyzing');
      setScanText('Finalizing brand profile...');
      
      setResult(data);
      await new Promise(r => setTimeout(r, 1000)); // Smooth transition
      setStatus('complete');
    } catch (e) {
      console.error(e);
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
      setStatus('error');
      setScanText('Analysis interrupted. Please try again.');
    }
  };

  const handleRetry = () => {
      hasRunRef.current = false; // Allow re-run
      performAudit();
  };

  if (status !== 'complete') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-500">
        <div className="relative">
          {/* Animated Rings */}
          <div className={`absolute inset-0 rounded-full border-2 border-dashed border-gray-200 ${status !== 'error' ? 'animate-[spin_10s_linear_infinite]' : ''} ${status === 'analyzing' ? 'border-purple-200' : ''}`}></div>
          <div className={`absolute inset-2 rounded-full border-2 border-dashed border-gray-300 ${status !== 'error' ? 'animate-[spin_8s_linear_infinite_reverse]' : ''}`}></div>
          
          <div className={`w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-sm relative z-10 ${status === 'error' ? 'border-2 border-red-50' : ''}`}>
             {status === 'scanning' && <Globe className="w-10 h-10 text-blue-500 animate-pulse" />}
             {status === 'researching' && <Database className="w-10 h-10 text-orange-500 animate-pulse" />}
             {status === 'analyzing' && <Sparkles className="w-10 h-10 text-purple-600 animate-pulse" />}
             {status === 'error' && <AlertTriangle className="w-10 h-10 text-red-500" />}
          </div>
        </div>
        
        <div className="space-y-2 max-w-md">
           <h3 className="font-serif text-2xl">
              {status === 'scanning' && 'Scanning Digital Footprint'}
              {status === 'researching' && 'Deep Market Research'}
              {status === 'analyzing' && 'Generating Strategy'}
              {status === 'error' && 'Analysis Failed'}
           </h3>
           <p className={`font-mono text-xs uppercase tracking-widest ${status === 'error' ? 'text-red-500' : 'text-gray-500 animate-pulse'}`}>{scanText}</p>
        </div>

        {/* Progress Bar or Retry */}
        {status === 'error' ? (
            <Button onClick={handleRetry} className="bg-red-600 border-red-600 hover:bg-red-700 text-white">
                <RefreshCcw size={16} className="mr-2" /> Retry Analysis
            </Button>
        ) : (
            <div className="max-w-xs w-full bg-gray-100 h-1 rounded-full overflow-hidden">
               <div className={`h-full transition-all duration-500 ease-out ${
                  status === 'scanning' ? 'w-1/3 bg-blue-500' :
                  status === 'researching' ? 'w-2/3 bg-orange-500' :
                  status === 'analyzing' ? 'w-full bg-purple-600' : 'w-full bg-red-500'
               }`}></div>
            </div>
        )}
      </div>
    );
  }

  if (!result) return null;

  return <BrandReport initialResult={result} input={input} />;
};
