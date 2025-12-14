
import React, { useEffect, useState, useRef } from 'react';
import { BrandInput, BrandAuditResult } from '../../../../types/brand';
import { auditBrand } from '../../../../services/ai/brandAudit';
import { Button } from '../../../Button';
import { Loader2, CheckCircle, TrendingUp, AlertTriangle, Target, Search, Share2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AnalysisStepProps {
  input: BrandInput;
}

export const AnalysisStep: React.FC<AnalysisStepProps> = ({ input }) => {
  const [status, setStatus] = useState<'scanning' | 'analyzing' | 'complete' | 'error'>('scanning');
  const [result, setResult] = useState<BrandAuditResult | null>(null);
  const [scanText, setScanText] = useState('Initializing agents...');
  const navigate = useNavigate();
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    performAudit();
    hasRunRef.current = true;
  }, []);

  const performAudit = async () => {
    setStatus('scanning');
    
    // 1. Scanning Phase Simulation
    setScanText(`Connecting to ${input.websiteUrl}...`);
    await new Promise(r => setTimeout(r, 1500));
    
    setStatus('analyzing');
    setScanText('Analyzing market positioning & competitors...');
    
    // 2. AI Call
    try {
      const data = await auditBrand(input);
      setResult(data);
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
          <div className="w-24 h-24 rounded-full border-4 border-gray-100 border-t-black animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <Search className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div>
           <h3 className="font-serif text-2xl mb-2">{status === 'scanning' ? 'Scanning Digital Footprint' : 'Synthesizing Strategy'}</h3>
           <p className="text-gray-500 font-mono text-sm">{scanText}</p>
        </div>
        {status === 'analyzing' && (
           <div className="max-w-md w-full bg-gray-100 h-1 rounded-full overflow-hidden">
              <div className="h-full bg-black animate-[loading-bar_2s_infinite]"></div>
           </div>
        )}
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Header Summary */}
      <div className="text-center mb-12">
         <span className="bg-green-100 text-green-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Audit Complete</span>
         <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">Your Brand Identity Card.</h2>
         <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
            {result.brand_profile.vibe_description}
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* Left: Report Card */}
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1A1A1A] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px]"></div>
               
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                     <div>
                        <h3 className="font-bold text-lg">{input.brandName}</h3>
                        <p className="text-gray-400 text-xs uppercase tracking-widest">{result.brand_profile.category}</p>
                     </div>
                     <div className="text-right">
                        <div className="text-4xl font-serif">{result.audit_score}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest">Health Score</div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div>
                        <div className="flex justify-between text-xs mb-1 text-gray-300">
                           <span>Visual Consistency</span>
                           <span>{result.content_health}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1">
                           <div className="bg-purple-400 h-1 rounded-full" style={{ width: `${result.content_health}%` }}></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs mb-1 text-gray-300">
                           <span>Market Clarity</span>
                           <span>{result.audit_score}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1">
                           <div className="bg-blue-400 h-1 rounded-full" style={{ width: `${result.audit_score}%` }}></div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                     <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Aesthetic Keywords</div>
                     <div className="flex flex-wrap gap-2">
                        {result.brand_profile.aesthetic_keywords.map(k => (
                           <span key={k} className="px-2 py-1 bg-white/10 rounded text-xs text-white border border-white/10">{k}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-xl">
               <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                  <Target size={16} /> Market Position
               </h4>
               <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                     <span className="text-gray-500">Price Tier</span>
                     <span className="font-medium">{result.brand_profile.price_positioning}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-gray-500">Audience</span>
                     <span className="font-medium text-right max-w-[150px]">{result.brand_profile.target_audience}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                     <span className="text-gray-500 block mb-1">Identified Competitors</span>
                     <div className="flex flex-wrap gap-2">
                        {result.competitors.map(c => (
                           <span key={c} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{c}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Right: Strategic Advice */}
         <div className="lg:col-span-8 space-y-6">
            <h3 className="font-serif text-2xl mb-4">Strategic Opportunities</h3>
            
            <div className="grid gap-4">
               {result.strategic_advice.map((advice, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-black transition-colors group">
                     <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                           <div className={`p-2 rounded-full ${advice.impact === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                              {advice.impact === 'High' ? <AlertTriangle size={18} /> : <TrendingUp size={18} />}
                           </div>
                           <h4 className="font-bold text-lg">{advice.title}</h4>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${advice.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                           {advice.impact} Impact
                        </span>
                     </div>
                     <p className="text-gray-600 leading-relaxed ml-11">{advice.description}</p>
                     <div className="ml-11 mt-4">
                        <button className="text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-600 transition-colors flex items-center gap-2 group-hover:gap-3">
                           Take Action <ArrowRight size={12} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>

            <div className="bg-[#FAF8F5] p-8 rounded-xl border border-[#E5D7A4] mt-8">
               <h4 className="font-serif text-xl mb-2 text-[#8A7A4A]">Identified Market Gap</h4>
               <p className="text-gray-700 italic">"{result.market_gap}"</p>
            </div>

            <div className="flex gap-4 pt-8">
               <Button onClick={() => navigate('/dashboard')} className="flex-1 justify-center py-4">Go to Dashboard</Button>
               <Button variant="secondary" className="flex-1 justify-center py-4">
                  <Share2 size={16} className="mr-2" /> Share Report
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};
