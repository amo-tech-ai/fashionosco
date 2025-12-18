import React from 'react';
import { Loader2 } from 'lucide-react';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-black animate-spin mb-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 animate-pulse mt-4">
        FashionOS Intelligence Ingesting...
      </p>
    </div>
  );
};