import React from 'react';

interface WorkflowNodeProps {
  title: string;
  active?: boolean;
}

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({ title, active }) => (
  <div className={`
    px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-500
    ${active 
      ? 'bg-black text-white border-black shadow-lg shadow-black/10 scale-105' 
      : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
    }
    flex items-center gap-2
  `}>
    {active && <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>}
    {title}
  </div>
);