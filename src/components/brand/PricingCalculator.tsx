
import React, { useState } from 'react';
import { Button } from '../Button';
import { DollarSign, Loader2, PieChart, Info } from 'lucide-react';
import { calculatePricingStrategy, PricingResult } from '../../services/ai/pricing';

export const PricingCalculator: React.FC = () => {
  const [category, setCategory] = useState('Dresses');
  const [margin, setMargin] = useState(65);
  const [costs, setCosts] = useState({
    fabric: 15,
    labor: 25,
    trims: 5,
    logistics: 8,
    duty: 0
  });
  const [result, setResult] = useState<PricingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const data = await calculatePricingStrategy(costs, margin, category);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCalculating(false);
    }
  };

  const updateCost = (key: string, val: string) => {
    setCosts(prev => ({ ...prev, [key]: parseFloat(val) || 0 }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* Input Panel */}
         <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="font-serif text-2xl mb-6">Production Costs</h3>
            
            <div className="space-y-4 mb-8">
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Product Category</label>
                  <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm" />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  {Object.entries(costs).map(([key, val]) => (
                     <div key={key}>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 capitalize">{key}</label>
                        <div className="relative">
                           <DollarSign className="absolute left-3 top-3 text-gray-400" size={14} />
                           <input 
                              type="number" 
                              value={val}
                              onChange={e => updateCost(key, e.target.value)}
                              className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:border-black focus:outline-none"
                           />
                        </div>
                     </div>
                  ))}
               </div>

               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 mt-4">Target Retail Margin ({margin}%)</label>
                  <input 
                     type="range" 
                     min="30" 
                     max="90" 
                     value={margin} 
                     onChange={e => setMargin(parseInt(e.target.value))}
                     className="w-full accent-black"
                  />
               </div>
            </div>

            <Button onClick={handleCalculate} isLoading={isCalculating} className="w-full justify-center">
               Calculate Pricing
            </Button>
         </div>

         {/* Result Panel */}
         <div className="flex flex-col justify-center">
            {!result ? (
               <div className="text-center text-gray-400 p-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                  <PieChart size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm">Enter costs to generate pricing strategy.</p>
               </div>
            ) : (
               <div className="space-y-6 animate-in zoom-in-95 duration-500">
                  {/* Big Numbers */}
                  <div className="bg-[#1A1A1A] text-white p-8 rounded-2xl shadow-xl">
                     <div className="grid grid-cols-2 gap-8 mb-8 border-b border-white/10 pb-8">
                        <div>
                           <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Landed Cost</div>
                           <div className="text-3xl font-mono">${result.cogs.toFixed(2)}</div>
                        </div>
                        <div>
                           <div className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">Margin</div>
                           <div className="text-3xl font-mono text-green-400">{result.achieved_margin}</div>
                        </div>
                     </div>
                     <div className="flex justify-between items-end">
                        <div>
                           <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Wholesale (WSP)</div>
                           <div className="text-2xl font-serif">${result.wholesale_price.toFixed(2)}</div>
                        </div>
                        <div className="text-right">
                           <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">Recommended Retail (RRP)</div>
                           <div className="text-5xl font-serif text-white">${result.rrp.toFixed(2)}</div>
                        </div>
                     </div>
                  </div>

                  {/* Logic Explanation */}
                  <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                     <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                        <Info size={14} /> AI Strategy
                     </h4>
                     <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {result.strategy_note}
                     </p>
                     <div className="space-y-2">
                        {result.breakdown.map((item, i) => (
                           <div key={i} className="flex justify-between text-xs py-2 border-b border-gray-50 last:border-0">
                              <span className="text-gray-500">{item.label}</span>
                              <span className="font-mono font-medium">{item.value > 10 ? `$${item.value.toFixed(2)}` : `${item.value}x`}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};
