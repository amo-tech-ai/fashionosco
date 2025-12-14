
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { BrandInput, BrandAuditResult } from '../../../../types/brand';
import { auditBrand } from '../../../../services/ai/brandAudit';
import { Search, Globe, Database, Sparkles, RefreshCcw, AlertTriangle } from 'lucide-react';
import { BrandReport } from './BrandReport';
import { Button } from '../../../Button';

interface AnalysisStepProps {
  input: BrandInput;
}

const LOADING_MESSAGES = [
  "Connecting to digital footprint...",
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
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  
  const hasRunRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  // Message Cycling Logic
  useEffect(() => {
    if (status === 'researching' || status === 'analyzing') {
      const interval = setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    setScanText(LOADING_MESSAGES[loadingMsgIndex]);
  }, [loadingMsgIndex]);

  const performAudit = useCallback(async () => {
    try {
      // Phase 1: Digital Handshake
      setStatus('scanning');
      setScanText(`Connecting to ${input.websiteUrl || 'brand presence'}...`);
      await new Promise(r => setTimeout(r, 1500));
      
      // Phase 2: Deep Research
      setStatus('researching');
      
      // Execute API Call with Safety Timeout
      const auditPromise = auditBrand(input);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Analysis timed out")), 60000)
      );
      
      const data = await Promise.race([auditPromise, timeoutPromise]) as BrandAuditResult;
      
      // Phase 3: Synthesis Transition
      setStatus('analyzing');
      setScanText('Finalizing strategic profile...');
      await new Promise(r => setTimeout(r, 1000)); // Smooth transition for UI
      
      setResult(data);
      setStatus('complete');

    } catch (e) {
      console.error("Audit failed:", e);
      setStatus('error');
      setScanText('Analysis interrupted. Please check connection and try again.');
    }
  }, [input]);

  useEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true;
      window.scrollTo(0, 0);
      performAudit();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [performAudit]);

  const handleRetry = () => {
      hasRunRef.current = false;
      setLoadingMsgIndex(0);
      performAudit();
  };

  // RENDER REPORT
  if (status === 'complete' && result) {
    return <BrandReport initialResult={result} input={input} />;
  }

  // RENDER LOADING / ERROR
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        {/* Animated Rings */}
        <div className={`absolute inset-0 rounded-full border-2 border-dashed border-gray-200 ${status !== 'error' ? 'animate-[spin_10s_linear_infinite]' : ''} ${status === 'analyzing' ? 'border-purple-200' : ''}`}></div>
        <div className={`absolute inset-2 rounded-full border-2 border-dashed border-gray-300 ${status !== 'error' ? 'animate-[spin_8s_linear_infinite_reverse]' : ''}`}></div>
        
        <div className={`w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-sm relative z-10 transition-colors duration-500 ${status === 'error' ? 'border-2 border-red-50' : ''}`}>
            {status === 'scanning' && <Globe className="w-10 h-10 text-blue-500 animate-pulse" />}
            {status === 'researching' && <Database className="w-10 h-10 text-orange-500 animate-pulse" />}
            {status === 'analyzing' && <Sparkles className="w-10 h-10 text-purple-600 animate-pulse" />}
            {status === 'error' && <AlertTriangle className="w-10 h-10 text-red-500" />}
        </div>
      </div>
      
      <div className="space-y-2 max-w-md h-16">
          <h3 className="font-serif text-2xl transition-all duration-300">
            {status === 'scanning' && 'Scanning Digital Footprint'}
            {status === 'researching' && 'Deep Market Research'}
            {status === 'analyzing' && 'Generating Strategy'}
            {status === 'error' && 'Analysis Failed'}
          </h3>
          <p className={`font-mono text-xs uppercase tracking-widest transition-opacity duration-300 ${status === 'error' ? 'text-red-500' : 'text-gray-500 animate-pulse'}`}>
            {scanText}
          </p>
      </div>

      {status === 'error' ? (
          <Button onClick={handleRetry} className="bg-red-600 border-red-600 hover:bg-red-700 text-white">
              <RefreshCcw size={16} className="mr-2" /> Retry Analysis
          </Button>
      ) : (
          <div className="max-w-xs w-full bg-gray-100 h-1 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 ease-in-out ${
                status === 'scanning' ? 'w-1/4 bg-blue-500' :
                status === 'researching' ? 'w-2/3 bg-orange-500' :
                'w-full bg-purple-600'
              }`}></div>
          </div>
      )}
    </div>
  );
};
