
import React from 'react';
import { Filter, Plus } from 'lucide-react';
import { Button } from '../Button';

interface ShotListHeaderProps {
  shotCount: number;
  onAddShot: () => void;
}

export const ShotListHeader: React.FC<ShotListHeaderProps> = ({ shotCount, onAddShot }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="font-serif text-3xl text-[#1A1A1A]">Shot List</h1>
        <p className="text-sm text-[#6B7280]">Campaign Production • {shotCount} Shots</p>
      </div>
      <div className="flex space-x-3">
        <button className="p-2 text-[#6B7280] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#E5E5E5]">
          <Filter size={18} />
        </button>
        <Button onClick={onAddShot} className="py-2 px-4 text-xs h-9 bg-[#1A1A1A] text-white">
          <Plus size={14} className="mr-2" /> Add Shot
        </Button>
      </div>
    </div>
  );
};
