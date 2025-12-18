import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIIndicatorProps {
  text: string;
}

export const AIIndicator: React.FC<AIIndicatorProps> = ({ text }) => (
  <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-600 rounded-full border border-purple-100 text-[9px] font-black uppercase tracking-widest animate-pulse">
    <Sparkles size={10} fill="currentColor" /> {text}
  </div>
);