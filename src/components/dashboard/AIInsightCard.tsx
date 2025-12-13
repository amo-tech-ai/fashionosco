
import React from 'react';
import { Sparkles } from 'lucide-react';

export const AIInsightCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#F3E8FF] to-white border border-[#E9D5FF] rounded-2xl shadow-sm p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E9D5FF] rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
      
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Sparkles size={18} className="text-[#A855F7]" />
        <span className="text-xs font-bold uppercase tracking-widest text-[#6B21A8]">AI Insight</span>
      </div>
      
      <h4 className="font-serif text-lg text-[#1A1A1A] mb-2 relative z-10">Production Alert</h4>
      <p className="text-sm text-[#4A4F5B] mb-4 leading-relaxed relative z-10">
        Rain is predicted for your outdoor shoot location next Tuesday. Would you like to check studio availability as a backup?
      </p>
      
      <div className="flex gap-2 relative z-10">
        <button className="flex-1 bg-white border border-[#E9D5FF] text-[#6B21A8] py-2 rounded-lg text-xs font-bold hover:bg-[#F3E8FF] transition-colors">Check Studio</button>
        <button className="flex-1 bg-transparent text-[#6B7280] py-2 text-xs font-medium hover:text-[#1A1A1A]">Dismiss</button>
      </div>
    </div>
  );
};
