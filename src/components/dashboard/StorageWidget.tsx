
import React from 'react';

export const StorageWidget: React.FC = () => {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-6">
      <h3 className="font-serif text-lg text-[#1A1A1A] mb-4">Storage Usage</h3>
      <div className="w-full bg-[#F7F7F5] rounded-full h-2 mb-4">
        <div className="bg-[#1A1A1A] h-2 rounded-full" style={{ width: '15%' }}></div>
      </div>
      <div className="flex justify-between text-xs text-[#6B7280] font-medium">
        <span>150GB Used</span>
        <span>1TB Total</span>
      </div>
    </div>
  );
};
