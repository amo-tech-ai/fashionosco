
import React from 'react';
import { Loader2 } from 'lucide-react';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-10 h-10 text-black animate-spin mb-4" />
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 animate-pulse">
        Loading Experience...
      </p>
    </div>
  );
};
