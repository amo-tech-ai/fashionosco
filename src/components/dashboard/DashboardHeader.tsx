
import React from 'react';
import { Camera } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  status: string;
  onNewShoot: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, status, onNewShoot }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] leading-tight">{title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-medium border border-[#DCFCE7]">
            {status}
          </span>
          <span className="text-sm text-[#6B7280]">• Last updated just now</span>
        </div>
      </div>
      <div className="flex space-x-3">
        <button className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#F7F7F5] transition-colors shadow-sm">
          Share View
        </button>
        <button 
          onClick={onNewShoot}
          className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm flex items-center"
        >
          <Camera size={16} className="mr-2" />
          New Shoot
        </button>
      </div>
    </div>
  );
};
