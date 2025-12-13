
import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface PropSummaryProps {
  props: string[];
}

export const PropSummary: React.FC<PropSummaryProps> = ({ props }) => {
  if (props.length === 0) return null;

  return (
    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
      <div className="flex items-center gap-2 mb-4 text-orange-800">
        <ShoppingBag size={16} />
        <h4 className="text-xs font-bold uppercase tracking-widest">Production Needs</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {props.map((prop, i) => (
          <span
            key={i}
            className="bg-white text-orange-900 border border-orange-200 px-2 py-1 rounded text-[10px] font-medium shadow-sm"
          >
            {prop}
          </span>
        ))}
      </div>
    </div>
  );
};
