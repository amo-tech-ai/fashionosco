
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowRight, Sparkles } from 'lucide-react';

export const DashboardEmptyState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border border-[#E5E5E5] rounded-2xl text-center shadow-sm animate-in fade-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Sparkles className="w-10 h-10 text-purple-600" />
      </div>
      
      <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4">Welcome to FashionOS</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg font-light leading-relaxed">
        Your studio command center is ready. Start by planning your first campaign with our AI-powered shoot wizard.
      </p>
      
      <button 
        onClick={() => navigate('/shoot-wizard')}
        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        <Camera size={18} />
        Create First Shoot
        <ArrowRight size={16} className="opacity-70 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-2xl w-full">
         <div className="p-4 rounded-lg bg-[#F7F7F5] border border-[#E5E5E5]">
            <div className="font-bold text-sm mb-1">AI Planning</div>
            <p className="text-xs text-gray-500">Generate shot lists automatically.</p>
         </div>
         <div className="p-4 rounded-lg bg-[#F7F7F5] border border-[#E5E5E5]">
            <div className="font-bold text-sm mb-1">Inventory</div>
            <p className="text-xs text-gray-500">Manage products and samples.</p>
         </div>
         <div className="p-4 rounded-lg bg-[#F7F7F5] border border-[#E5E5E5]">
            <div className="font-bold text-sm mb-1">Client Gallery</div>
            <p className="text-xs text-gray-500">Share proofs and get feedback.</p>
         </div>
      </div>
    </div>
  );
};
