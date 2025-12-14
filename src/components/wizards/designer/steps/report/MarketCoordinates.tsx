
import React from 'react';
import { Target } from 'lucide-react';
import { BrandAuditResult } from '../../../../../types/brand';

interface MarketCoordinatesProps {
  result: BrandAuditResult;
}

export const MarketCoordinates: React.FC<MarketCoordinatesProps> = ({ result }) => {
  return (
    <div className="bg-white border border-gray-200 p-8 rounded-2xl">
       <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
          <Target size={14} /> Market Coordinates
       </h4>
       <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4">
             <span className="text-sm text-gray-500">Price Tier</span>
             <span className="font-medium text-sm bg-gray-100 px-3 py-1 rounded-full">{result.brand_profile.price_positioning}</span>
          </div>
          <div>
             <span className="text-sm text-gray-500 block mb-2">Target Audience</span>
             <span className="font-medium text-sm leading-relaxed">{result.brand_profile.target_audience}</span>
          </div>
          <div>
             <span className="text-sm text-gray-500 block mb-3">Aesthetic Keywords</span>
             <div className="flex flex-wrap gap-2">
                {result.brand_profile.aesthetic_keywords.map((k, i) => (
                   <span key={i} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] uppercase font-bold text-gray-600">{k}</span>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};
