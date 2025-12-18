
import React from 'react';
import { KPIGrid } from '../KPIGrid';
import { ActionBanner } from '../ActionBanner';
import { ActivityFeed } from '../ActivityFeed';
import { DeliverablesList } from '../DeliverablesList';
import { TeamPanel } from '../TeamPanel';
import { AIInsightCard } from '../AIInsightCard';
import { StorageWidget } from '../StorageWidget';
import { BrandHealthWidget } from '../BrandHealthWidget';
import { CastingMatchmaker } from './CastingMatchmaker';
import { Button } from '../../Button';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ShootDashboardProps {
  campaign: any;
}

export const ShootDashboard: React.FC<ShootDashboardProps> = ({ campaign }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Alert / CTA for Production Mode */}
      <div className="bg-black text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
         <div className="relative z-10 space-y-1">
            <h3 className="font-serif text-2xl">Production Ready.</h3>
            <p className="text-gray-400 text-sm font-light">The studio is prepped for your session. Enter the console to track samples and live cues.</p>
         </div>
         <Button 
            onClick={() => navigate('/production')} 
            className="bg-white text-black border-none hover:bg-purple-50 transition-all flex items-center gap-2 group whitespace-nowrap"
         >
            <Play size={16} fill="currentColor" /> Go to Live Shoot
         </Button>
      </div>

      <KPIGrid campaign={campaign} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
        {/* Main Intelligence Stream */}
        <div className="lg:col-span-8 space-y-8">
          <CastingMatchmaker vibe={campaign?.vibe || 'minimalist'} />
          <ActionBanner />
          <ActivityFeed campaign={campaign} />
          <DeliverablesList campaign={campaign} totalShots={campaign?.shotList?.length || 0} />
        </div>

        {/* Tactical Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <BrandHealthWidget /> 
          <TeamPanel campaign={campaign} />
          <AIInsightCard />
          <StorageWidget />
        </div>
      </div>
    </>
  );
};
