import React, { useState } from 'react';
import { useShootWizard } from '../../../../contexts/ShootWizardContext';
import { Globe, Instagram, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../../../Button';

export const SignalCapture: React.FC = () => {
  const { dispatch } = useShootWizard();
  const [urls, setUrls] = useState({ website: '', social: '', commerce: '' });

  const handleStart = () => {
    dispatch({ type: 'SET_STEP', step: 'thinking' });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl mb-4">Connect Brand Signals.</h1>
        <p className="text-gray-500 font-light">We extract aesthetic keywords, color palettes, and product details automatically.</p>
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
          disabled={!urls.website}
          className="w-full py-6 rounded-3xl text-sm shadow-2xl hover:scale-[1.02]"
        >
          Begin Signal Analysis <ArrowRight size={18} className="ml-2" />
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