
import React from 'react';
import { Package, Clock, ShieldCheck, Zap } from 'lucide-react';

interface ProductionSidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export const ProductionSidebar: React.FC<ProductionSidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'samples', label: 'Sample Tracker', icon: Package, sub: 'Inventory Health' },
    { id: 'callsheet', label: 'Call Sheet', icon: Clock, sub: 'Live Schedule' },
    { id: 'rights', label: 'Usage Rights', icon: ShieldCheck, sub: 'Licensing Monitor' }
  ];

  return (
    <aside className="lg:col-span-3 space-y-6">
      <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm space-y-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
              activeTab === tab.id 
                ? 'bg-[#1A1A1A] text-white shadow-xl translate-x-2' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-black'
            }`}
          >
            <tab.icon size={20} className={activeTab === tab.id ? 'text-purple-400' : 'text-gray-300'} />
            <div className="text-left">
              <div className="text-sm font-bold">{tab.label}</div>
              <div className={`text-[9px] uppercase tracking-widest font-black ${
                activeTab === tab.id ? 'text-gray-400' : 'text-gray-300'
              }`}>{tab.sub}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-[#1A1A1A] text-white rounded-[2rem] p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all duration-1000"></div>
        <div className="relative z-10 space-y-6">
           <div className="flex items-center gap-2 text-purple-400 font-bold text-[9px] uppercase tracking-[0.2em]">
              <Zap size={10} fill="currentColor" /> Budget Watchdog
           </div>
           <div>
              <div className="text-3xl font-serif font-bold">$4,250</div>
              <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">Landed Production Cost</div>
           </div>
           <p className="text-[10px] text-gray-400 italic font-light leading-relaxed">
             "AI Logic: Current catering count aligns with RSVP list. No variance detected."
           </p>
        </div>
      </div>
    </aside>
  );
};
