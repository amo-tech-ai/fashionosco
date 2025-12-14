
import React, { useState } from 'react';
import { Search, Loader2, TrendingUp, Globe, Target } from 'lucide-react';
import { Button } from '../Button';
import { getDeepMarketAudit, MarketAuditResult } from '../../services/ai/market';

export const MarketIntel: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [pricePoint, setPricePoint] = useState('Contemporary');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MarketAuditResult | null>(null);

  const handleAnalyze = async () => {
    if (!query || !category) return;
    setIsAnalyzing(true);
    try {
      const data = await getDeepMarketAudit(query, category, pricePoint);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
         <h2 className="font-serif text-2xl mb-2">Competitor Watch & Trend Spotting</h2>
         <p className="text-gray-500 text-sm mb-6">Deploy autonomous agents to scan the market for pricing and aesthetic trends.</p>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
               <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Category</label>
               <input 
                  type="text" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Silk Evening Dresses"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-black focus:outline-none"
               />
            </div>
            <div>
               <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Specific Focus</label>
               <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Pricing strategy..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-black focus:outline-none"
               />
            </div>
            <div>
               <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Price Tier</label>
               <select 
                  value={pricePoint}
                  onChange={(e) => setPricePoint(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-black focus:outline-none"
               >
                  <option value="Mass Market">Mass Market</option>
                  <option value="Contemporary">Contemporary</option>
                  <option value="Luxury">Luxury</option>
               </select>
            </div>
         </div>
         
         <Button onClick={handleAnalyze} isLoading={isAnalyzing} disabled={!query || !category}>
            {isAnalyzing ? 'Scanning Market...' : 'Run Deep Audit'}
         </Button>
      </div>

      {result && (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8">
            {/* Summary */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-[#1A1A1A] text-white p-8 rounded-2xl relative overflow-hidden">
                  <div className="relative z-10">
                     <h3 className="font-serif text-2xl mb-4">Market Pulse</h3>
                     <p className="text-gray-300 leading-relaxed mb-6">{result.trend_summary}</p>
                     <div className="flex flex-wrap gap-2">
                        {result.trending_keywords.map((k, i) => (
                           <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest">{k}</span>
                        ))}
                     </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/30 blur-[100px]"></div>
               </div>

               <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-6">Competitor Landscape</h4>
                  <div className="space-y-4">
                     {result.competitors.map((comp, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                           <div>
                              <div className="font-bold text-lg">{comp.name}</div>
                              <div className="text-sm text-gray-500">{comp.item_name}</div>
                           </div>
                           <div className="text-right">
                              <div className="font-serif text-xl font-bold">{comp.price}</div>
                              <div className="text-[10px] text-gray-400 max-w-[150px] truncate">{comp.notes}</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Pricing Matrix */}
            <div className="space-y-6">
               <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                     <Target size={16} /> Price Positioning
                  </h4>
                  <div className="space-y-6 relative pl-4 border-l-2 border-gray-100">
                     <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Market Entry</div>
                        <div className="font-serif text-xl">{result.pricing_matrix.market_low}</div>
                     </div>
                     <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-white"></div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Average</div>
                        <div className="font-serif text-xl">{result.pricing_matrix.market_average}</div>
                     </div>
                     <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 bg-purple-400 rounded-full border-2 border-white"></div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Premium / Luxury</div>
                        <div className="font-serif text-xl">{result.pricing_matrix.market_high}</div>
                     </div>
                  </div>
               </div>

               <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2">
                     <TrendingUp size={16} /> Strategic Gaps
                  </h4>
                  <ul className="space-y-3">
                     {result.opportunities.map((op, i) => (
                        <li key={i} className="text-sm text-blue-900 leading-snug flex items-start gap-2">
                           <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0"></span>
                           {op}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
