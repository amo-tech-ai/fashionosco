
import React from 'react';
import { KPIGrid } from '../KPIGrid';
import { ActionBanner } from '../ActionBanner';
import { ActivityFeed } from '../ActivityFeed';
import { DeliverablesList } from '../DeliverablesList';
import { TeamPanel } from '../TeamPanel';
import { AIInsightCard } from '../AIInsightCard';
import { StorageWidget } from '../StorageWidget';
import { BrandHealthWidget } from '../BrandHealthWidget';

interface ShootDashboardProps {
  campaign: any;
}

export const ShootDashboard: React.FC<ShootDashboardProps> = ({ campaign }) => {
  return (
    <>
      <KPIGrid campaign={campaign} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Left Column: Workflow & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <ActionBanner />
          <ActivityFeed campaign={campaign} />
          <DeliverablesList campaign={campaign} totalShots={campaign?.shotList?.length || 0} />
        </div>

        {/* Right Column: Insights & Resources */}
        <div className="space-y-8">
          <BrandHealthWidget /> 
          <TeamPanel campaign={campaign} />
          <AIInsightCard />
          <StorageWidget />
        </div>
      </div>
    </>
  );
};
