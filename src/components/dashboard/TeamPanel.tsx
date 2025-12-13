
import React from 'react';
import { Calendar } from 'lucide-react';

interface TeamPanelProps {
  campaign: any;
}

export const TeamPanel: React.FC<TeamPanelProps> = ({ campaign }) => {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif text-lg text-[#1A1A1A]">Team Access</h3>
        <button className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#6B7280]">Manage</button>
      </div>
      <div className="flex -space-x-2 overflow-hidden mb-6">
        {[1,2,3,4].map((i) => (
          <img 
            key={i}
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
            src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1506794778202-cad84cf45f1d' : i === 3 ? '1507003211169-0a1dd7228f2d' : '1517841905240-472988babdf9'}?q=80&w=100&auto=format&fit=crop`}
            alt=""
          />
        ))}
        <div className="h-10 w-10 rounded-full bg-[#F7F7F5] border border-white flex items-center justify-center text-xs font-medium text-[#6B7280] ring-2 ring-white">
          +2
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-[#6B7280]">
          <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
          3 Members Online
        </div>
        <div className="flex items-center gap-3 text-sm text-[#6B7280]">
          <Calendar size={14} />
          Shoot Day: {campaign?.date ? new Date(campaign.date).toLocaleDateString() : 'TBD'}
        </div>
      </div>
    </div>
  );
};
