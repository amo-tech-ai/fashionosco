import React, { useState } from 'react';
import { useShootWizard } from '../../../../contexts/ShootWizardContext';
import { Globe, Instagram, ShoppingBag, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Button } from '../../../Button';
import { auditBrandDna } from '../../../../services/ai/brandDna';
import { useToast } from '../../../ToastProvider';

export const SignalCapture: React.FC = () => {
  const { dispatch } = useShootWizard();
  const { addToast } = useToast();
  const [urls, setUrls] = useState({ website: '', social: '', commerce: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStart = async () => {
    if (!urls.website) return;
    
    setIsProcessing(true);
    dispatch({ type: 'SET_STEP', step: 'thinking' });

    try {
      const result = await auditBrandDna(urls.website, urls.social);
      
      // Update global context with AI insights
      dispatch({ type: 'SET_FIELD', field: 'brandVibeContext', value: result.brand_profile.vibe_description });
      dispatch({ type: 'SET_FIELD', field: 'vibe', value: 'editorial' }); // Default to editorial
      dispatch({ type: 'SET_FIELD', field: 'referenceBrands', value: result.competitors.join(', ') });
      
      // Pass the audit result for the summary view
      dispatch({ type: 'SET_STRATEGY', strategy: result });
      
      addToast("Brand DNA successfully synchronized.", "success");
    } catch (e) {
      addToast("AI Analysis interrupted. Falling back to manual entry.", "error");
      dispatch({ type: 'SET_STEP', step: 'signals' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full border border-purple-100 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
           <Sparkles size={12} fill="currentColor" /> Deep Research Agent
        </div>
        <h1 className="text-4xl md:text-5xl mb-4">Connect Brand Signals.</h1>
        <p className="text-gray-500 font-light">We use Gemini 3 Pro to extract aesthetic keywords, color palettes, and product details automatically from your digital presence.</p>
      </div>

      <div className="space-y-6">
        <div className="relative group">
          <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
          <input 
            type="url"
            placeholder="brandwebsite.com"
            className="w-full pl-16 pr-6 py-6 bg-white border border-gray-200 rounded-3xl text-lg focus:outline-none focus:ring-1 focus:ring-black transition-all shadow-sm"
            value={urls.website}
            onChange={(e) => setUrls({...urls, website: e.target.value})}
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-purple-400 uppercase tracking-widest opacity-0 group-focus-within:opacity-100 transition-opacity">Auto-Scan Active</div>
        </div>

        <div className="relative group">
          <Instagram className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
          <input 
            type="text"
            placeholder="@instagram_handle"
            className="w-full pl-16 pr-6 py-6 bg-white border border-gray-200 rounded-3xl text-lg focus:outline-none focus:ring-1 focus:ring-black transition-all shadow-sm"
            value={urls.social}
            onChange={(e) => setUrls({...urls, social: e.target.value})}
          />
        </div>

        <div className="relative group">
          <ShoppingBag className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
          <input 
            type="url"
            placeholder="Shopify / Amazon store link..."
            className="w-full pl-16 pr-6 py-6 bg-white border border-gray-200 rounded-3xl text-lg focus:outline-none focus:ring-1 focus:ring-black transition-all shadow-sm"
            value={urls.commerce}
            onChange={(e) => setUrls({...urls, commerce: e.target.value})}
          />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-6">
        <Button 
          onClick={handleStart}
          isLoading={isProcessing}
          disabled={!urls.website || isProcessing}
          className="w-full py-6 rounded-3xl text-sm shadow-2xl hover:scale-[1.02] bg-black text-white"
        >
          {isProcessing ? 'Analyzing...' : 'Begin Signal Analysis'} <ArrowRight size={18} className="ml-2" />
        </Button>
        <button 
          onClick={() => dispatch({ type: 'SET_STEP', step: 'mode' })}
          className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};