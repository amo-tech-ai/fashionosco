
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { KPIGrid } from '../components/dashboard/KPIGrid';
import { ActionBanner } from '../components/dashboard/ActionBanner';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { DeliverablesList } from '../components/dashboard/DeliverablesList';
import { TeamPanel } from '../components/dashboard/TeamPanel';
import { AIInsightCard } from '../components/dashboard/AIInsightCard';
import { StorageWidget } from '../components/dashboard/StorageWidget';
import { BrandHealthWidget } from '../components/dashboard/BrandHealthWidget'; // Import Widget
import { DashboardEmptyState } from '../components/dashboard/DashboardEmptyState';
import { useCampaigns } from '../hooks/useCampaigns';
import { useActiveCampaign } from '../contexts/ActiveCampaignContext';
import { Calendar, Camera, Loader2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { campaigns } = useCampaigns();
  const { activeCampaign, setActiveCampaignId, isLoading } = useActiveCampaign();

  const handleNewShoot = () => {
    localStorage.removeItem('wizard_state');
    navigate('/shoot-wizard');
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (campaigns.length === 0) {
     return (
        <div className="space-y-8 animate-in fade-in duration-500 p-6 md:p-8 overflow-y-auto h-full">
           <DashboardHeader 
              title="Dashboard" 
              status="Overview" 
              onNewShoot={handleNewShoot} 
           />
           <DashboardEmptyState />
        </div>
     );
  }

  // Construct display object for components
  const displayCampaign = activeCampaign ? {
     ...activeCampaign.data,
     id: activeCampaign.id,
     status: activeCampaign.status,
     title: activeCampaign.title,
     progress: activeCampaign.progress,
     shotList: activeCampaign.data?.shotList || [],
     moodBoardImages: activeCampaign.data?.moodBoardImages || []
  } : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-6 md:p-8 overflow-y-auto h-full">
      
      <DashboardHeader 
        title={activeCampaign?.title || 'Dashboard'} 
        status={activeCampaign?.status || 'Active'} 
        onNewShoot={handleNewShoot} 
      />

      {/* Campaign Switcher */}
      {campaigns.length > 1 && (
         <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {campaigns.map(c => (
               <button
                  key={c.id}
                  onClick={() => setActiveCampaignId(c.id)}
                  className={`flex items-center gap-3 p-3 pr-6 rounded-lg border transition-all min-w-[200px] flex-shrink-0 ${
                     activeCampaign?.id === c.id 
                     ? 'bg-[#1A1A1A] text-white border-black shadow-md' 
                     : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}
               >
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center ${activeCampaign?.id === c.id ? 'bg-white/10' : 'bg-gray-100'}`}>
                     {c.type === 'event' ? <Calendar size={18} /> : <Camera size={18} />}
                  </div>
                  <div className="text-left min-w-0">
                     <div className="text-xs font-bold uppercase tracking-wider opacity-70">{c.type}</div>
                     <div className="font-bold text-sm truncate max-w-[140px]">{c.title}</div>
                  </div>
               </button>
            ))}
         </div>
      )}

      <KPIGrid campaign={displayCampaign} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        
        {/* Left Column: Activity & Actions */}
        <div className="lg:col-span-2 space-y-8">
           <ActionBanner />
           <ActivityFeed campaign={displayCampaign} />
           <DeliverablesList campaign={displayCampaign} totalShots={displayCampaign?.shotList?.length || 0} />
        </div>

        {/* Right Column: AI & Team */}
        <div className="space-y-8">
           <BrandHealthWidget /> 
           <TeamPanel campaign={displayCampaign} />
           <AIInsightCard />
           <StorageWidget />
        </div>
      </div>
    </div>
  );
};
