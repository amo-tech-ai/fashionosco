
import React from 'react';
import { Search, GripVertical } from 'lucide-react';

export const AssetsSidebar: React.FC = () => {
  return (
    <div className="w-full md:w-64 flex flex-col bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden flex-shrink-0">
      <div className="p-4 border-b border-[#E5E5E5]">
        <h2 className="font-serif text-lg text-[#1A1A1A] mb-4">Assets</h2>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search wardrobe..." 
            className="w-full bg-[#F7F7F5] border border-transparent rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-[#E5E5E5] focus:bg-white transition-all"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {[1,2,3,4,5].map((i) => (
          <div key={i} className="flex items-center p-2 hover:bg-[#F7F7F5] rounded-lg cursor-grab active:cursor-grabbing group transition-colors">
            <div className="w-10 h-10 bg-[#F7F7F5] rounded border border-[#E5E5E5] overflow-hidden flex-shrink-0">
              <img 
                src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1515886657613-9f3515b0c78f' : '1523381210434-271e8be1f52b'}?q=80&w=100&auto=format&fit=crop`} 
                className="w-full h-full object-cover" 
                alt="Asset" 
              />
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-xs font-medium text-[#1A1A1A] truncate">Summer Dress {i}</p>
              <p className="text-[10px] text-[#9CA3AF]">SKU-10{i}</p>
            </div>
            <GripVertical size={14} className="ml-auto text-[#D1D5DB] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};
