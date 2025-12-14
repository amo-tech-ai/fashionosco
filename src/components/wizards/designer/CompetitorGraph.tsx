
import React from 'react';

interface CompetitorGraphProps {
  competitors: string[];
  myBrandName: string;
}

export const CompetitorGraph: React.FC<CompetitorGraphProps> = ({ competitors, myBrandName }) => {
  // Mock data simulation for visualization based on string inputs
  const dataPoints = [
     { name: competitors[0] || 'Competitor A', price: 80, color: 'bg-gray-300' },
     { name: competitors[1] || 'Competitor B', price: 250, color: 'bg-gray-400' },
     { name: myBrandName, price: 320, color: 'bg-black border-2 border-white ring-2 ring-black' },
     { name: competitors[2] || 'Competitor C', price: 450, color: 'bg-gray-300' },
     { name: competitors[3] || 'Competitor D', price: 890, color: 'bg-gray-300' },
  ];

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
        {dataPoints.map((comp, i) => {
           const leftPos = (i / (dataPoints.length - 1)) * 90 + 5; 
           const heightPercent = (comp.price / 1000) * 100;
           
           return (
              <div 
                 key={i}
                 className="absolute bottom-0 flex flex-col items-center group transition-all duration-500"
                 style={{ left: `${leftPos}%` }}
              >
                 <div 
                    className={`w-4 h-4 rounded-full mb-1 group-hover:scale-150 transition-all cursor-pointer relative shadow-sm ${comp.color}`}
                    style={{ marginBottom: `${heightPercent}px` }}
                 >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                       Est. ${comp.price}
                    </div>
                 </div>
                 <div className="h-full w-px bg-gray-100 absolute bottom-0 -z-10" style={{ height: `${heightPercent}px` }}></div>
                 <span className={`text-[10px] font-bold uppercase mt-2 ${comp.name === myBrandName ? 'text-black' : 'text-gray-400'}`}>{comp.name}</span>
              </div>
           );
        })}

      </div>
      <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
         <span>Mass Market</span>
         <span>Luxury Tier</span>
      </div>
    </div>
  );
};
