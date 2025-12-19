import React, { useState, useMemo } from 'react';
import { KPIGrid } from '../KPIGrid';
import { ActionBanner } from '../ActionBanner';
import { ActivityFeed } from '../ActivityFeed';
import { DeliverablesList } from '../DeliverablesList';
import { TeamPanel } from '../TeamPanel';
import { AIInsightCard } from '../AIInsightCard';
import { StorageWidget } from '../StorageWidget';
import { BrandHealthWidget } from '../BrandHealthWidget';
import { CastingMatchmaker } from './CastingMatchmaker';
import { ROIModelingDashboard } from '../ROIModelingDashboard';
import { Button } from '../../Button';
import { Play, TrendingUp, LayoutDashboard, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ShootDashboardProps {
  campaign: any;
}

export const ShootDashboard: React.FC<ShootDashboardProps> = ({ campaign }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ops' | 'roi'>('ops');

  // Logic: Highlight if production is imminent
  const isProductionReady = useMemo(() => {
    return campaign?.status === 'Pre-Production' || (campaign?.shotList?.length > 0 && campaign?.galleryStats?.total === 0);
  }, [campaign]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Live Execution Banner */}
      <div className={`
        p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden transition-all duration-700
        ${isProductionReady ? 'bg-[#0A0A0A] text-white' : 'bg-white border border-gray-200 text-black'}
      `}>
         {isProductionReady && (
           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
         )}
         
         <div className="relative z-10 space-y-2">
            <div className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.3em] ${isProductionReady ? 'text-red-500' : 'text-gray-400'}`}>
               <div className={`w-2 h-2 rounded-full ${isProductionReady ? 'bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-gray-300'}`}></div>
               {isProductionReady ? 'Live Production Active' : 'Pre-Production Phase'}
            </div>
            <h3 className="font-serif text-3xl md:text-4xl">
               {isProductionReady ? 'Production Console.' : 'Briefing Complete.'}
            </h3>
            <p className={`${isProductionReady ? 'text-gray-400' : 'text-gray-500'} text-sm font-light max-w-md leading-relaxed`}>
               {isProductionReady 
                 ? "The set is prepped. Enter the live console to monitor temporal drift and trigger segment cues." 
                 : "Your shot list has been generated. Assign products to scenes to proceed to live production."}
            </p>
         </div>

         <div className="flex gap-4 relative z-10">
            {isProductionReady && (
               <button className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  <Radio size={14} /> Check Cues
               </button>
            )}
            <Button 
               onClick={() => navigate('/production')} 
               className={`
                  transition-all flex items-center gap-3 group whitespace-nowrap py-4 px-8 rounded-2xl shadow-xl border-none
                  ${isProductionReady ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'}
               `}
            >
               <Play size={18} fill="currentColor" /> {isProductionReady ? 'Enter Live Console' : 'Preview Session'}
            </Button>
         </div>
      </div>

      {/* 2. Section Navigation */}
      <div className="flex gap-8 border-b border-gray-100">
         <button 
           onClick={() => setActiveTab('ops')}
           className={`pb-6 text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 relative ${activeTab === 'ops' ? 'text-black' : 'text-gray-400 hover:text-black'}`}
         >
            <LayoutDashboard size={14} /> Operations
            {activeTab === 'ops' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black animate-in fade-in slide-in-from-left duration-300"></div>}
         </button>
         <button 
           onClick={() => setActiveTab('roi')}
           className={`pb-6 text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 relative ${activeTab === 'roi' ? 'text-purple-600' : 'text-gray-400 hover:text-black'}`}
         >
            <TrendingUp size={14} /> ROI Modeling
            {activeTab === 'roi' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 animate-in fade-in slide-in-from-left duration-300"></div>}
         </button>
      </div>

      {/* 3. Dynamic Tab Content */}
      <div className="animate-in fade-in duration-700">
         {activeTab === 'ops' ? (
           <>
             <KPIGrid campaign={campaign} />

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
               <div className="lg:col-span-8 space-y-10">
                 <CastingMatchmaker vibe={campaign?.vibe || 'minimalist'} />
                 <ActionBanner />
                 <ActivityFeed campaign={campaign} />
                 <DeliverablesList campaign={campaign} totalShots={campaign?.shotList?.length || 0} />
               </div>

               <div className="lg:col-span-4 space-y-10">
                 <BrandHealthWidget /> 
                 <TeamPanel campaign={campaign} />
                 <AIInsightCard />
                 <StorageWidget />
               </div>
             </div>
           </>
         ) : (
           <ROIModelingDashboard />
         )}
      </div>
    </div>
  );
};