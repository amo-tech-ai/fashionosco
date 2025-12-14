
import React from 'react';
import { CompetitorData } from '../../../../types/brand';

interface CompetitorGraphProps {
  competitors: CompetitorData[];
  myBrandName: string;
}

export const CompetitorGraph: React.FC<CompetitorGraphProps> = ({ competitors, myBrandName }) => {
  // Find range
  const prices = competitors.map(c => c.estimated_price_point);
  const maxPrice = Math.max(...prices, 1500) * 1.2;
  const minPrice = 0;

  // Insert "My Brand" placeholder if not present (simulated logic)
  const myBrandPrice = prices.reduce((a,b) => a+b, 0) / prices.length * 0.8; // Assume competitive pricing

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 mt-6">
      <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-6">Price Positioning Matrix</h4>
      
      <div className="relative h-32 w-full flex items-end px-4 border-b border-gray-200">
        
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
           <div className="border-t border-gray-100 w-full h-0"></div>
           <div className="border-t border-gray-100 w-full h-0"></div>
           <div className="border-t border-gray-100 w-full h-0"></div>
        </div>

        {/* Competitor Dots */}
        {competitors.map((comp, i) => {
           const leftPos = (i / (competitors.length)) * 80 + 10; // Distribute horizontally
           const heightPercent = (comp.estimated_price_point / maxPrice) * 100;
           
           return (
              <div 
                 key={i}
                 className="absolute bottom-0 flex flex-col items-center group transition-all duration-500"
                 style={{ left: `${leftPos}%` }}
              >
                 <div 
                    className="w-3 h-3 bg-gray-300 rounded-full mb-1 group-hover:scale-150 group-hover:bg-purple-500 transition-all cursor-pointer relative"
                    style={{ marginBottom: `${heightPercent}px` }}
                 >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                       ${comp.estimated_price_point}
                    </div>
                 </div>
                 <div className="h-full w-px bg-gray-100 absolute bottom-0 -z-10" style={{ height: `${heightPercent}px` }}></div>
                 <span className="text-[10px] font-bold text-gray-400 uppercase mt-2">{comp.name}</span>
              </div>
           );
        })}

        {/* My Brand Dot (Simulated) */}
        <div 
           className="absolute bottom-0 flex flex-col items-center"
           style={{ left: '50%' }}
        >
           <div 
              className="w-4 h-4 bg-black border-2 border-white rounded-full mb-1 shadow-lg relative z-20"
              style={{ marginBottom: `${(myBrandPrice / maxPrice) * 100}px` }}
           >
              <div className="absolute top-0 right-0 -mt-1 -mr-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
           </div>
           <span className="text-[10px] font-bold text-black uppercase mt-2 bg-white px-1 border border-gray-200 rounded">{myBrandName}</span>
        </div>

      </div>
      <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
         <span>Mass Market</span>
         <span>Luxury Tier</span>
      </div>
    </div>
  );
};
