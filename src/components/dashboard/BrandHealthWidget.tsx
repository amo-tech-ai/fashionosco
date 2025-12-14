
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, TrendingUp } from 'lucide-react';
import { BrandService } from '../../services/data/brands';
import { BrandProfile } from '../../types/brand';

export const BrandHealthWidget: React.FC = () => {
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBrand = async () => {
      const data = await BrandService.get();
      setProfile(data);
    };
    loadBrand();
    
    // Listen for updates from the wizard
    window.addEventListener('brandProfileUpdated', loadBrand);
    return () => window.removeEventListener('brandProfileUpdated', loadBrand);
  }, []);

  if (!profile || !profile.auditResult) {
    return (
      <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center space-y-4 h-full">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <Activity size={20} className="text-gray-400" />
        </div>
        <div>
          <h3 className="font-serif text-lg text-[#1A1A1A]">Brand Audit</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-[200px] mx-auto">Get an AI analysis of your market position and visual strategy.</p>
        </div>
        <button 
          onClick={() => navigate('/create-profile')}
          className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1 hover:text-gray-600 transition-colors"
        >
          Start Audit
        </button>
      </div>
    );
  }

  const { audit_score, content_health } = profile.auditResult;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-6 h-full relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-100 transition-colors"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <h3 className="font-serif text-lg text-[#1A1A1A]">{profile.brandName}</h3>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Brand Health</p>
        </div>
        <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-green-100 flex items-center gap-1">
          <TrendingUp size={10} /> Live
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-end mb-1">
            <span className="text-3xl font-serif text-[#1A1A1A]">{audit_score}</span>
            <span className="text-xs text-gray-400 mb-1">/ 100</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full" style={{ width: `${audit_score}%` }}></div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-500">Content Consistency</span>
            <span className="font-bold">{content_health}%</span>
          </div>
          <button 
            onClick={() => navigate('/dashboard/brand')}
            className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center gap-1 hover:gap-2 transition-all mt-4"
          >
            View Full Report <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
