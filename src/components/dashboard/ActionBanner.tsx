
import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ActionBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1A1A1A] text-white p-5 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="font-medium text-sm">Action Required</h3>
          <p className="text-white/70 text-xs">Review the AI-generated shot list and approve logistics.</p>
        </div>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <button 
          onClick={() => navigate('/dashboard/shotlist')}
          className="flex-1 px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-gray-100 transition-colors text-center"
        >
          Review Shots
        </button>
        <button 
          onClick={() => navigate('/dashboard/gallery')}
          className="flex-1 px-4 py-2 bg-transparent border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-white/10 transition-colors text-center"
        >
          Gallery
        </button>
      </div>
    </div>
  );
};
