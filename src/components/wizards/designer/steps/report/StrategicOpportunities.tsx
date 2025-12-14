
import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { BrandAuditResult } from '../../../../../types/brand';

interface StrategicOpportunitiesProps {
  result: BrandAuditResult;
}

export const StrategicOpportunities: React.FC<StrategicOpportunitiesProps> = ({ result }) => {
  return (
    <div className="space-y-4">
       <h3 className="font-serif text-2xl text-[#1A1A1A]">Strategic Opportunities</h3>
       <div className="grid gap-4">
          {result.strategic_advice.map((advice, i) => (
             <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-black transition-all group shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${advice.impact === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                         {advice.impact === 'High' ? <AlertTriangle size={18} /> : <TrendingUp size={18} />}
                      </div>
                      <h4 className="font-bold text-lg text-gray-900">{advice.title}</h4>
                   </div>
                   <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${advice.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {advice.impact} Impact
                   </span>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm ml-12">{advice.description}</p>
             </div>
          ))}
       </div>
       
       <div className="bg-[#FAF8F5] p-8 rounded-xl border border-[#E5D7A4] relative overflow-hidden mt-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5D7A4] opacity-20 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <h4 className="font-serif text-xl mb-2 text-[#8A7A4A] relative z-10">Identified Market Gap</h4>
          <p className="text-gray-700 italic relative z-10">"{result.market_gap}"</p>
       </div>
    </div>
  );
};
