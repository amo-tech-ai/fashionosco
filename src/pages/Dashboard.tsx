
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { KPIGrid } from '../components/dashboard/KPIGrid';
import { ActionBanner } from '../components/dashboard/ActionBanner';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { DeliverablesList } from '../components/dashboard/DeliverablesList';
import { TeamPanel } from '../components/dashboard/TeamPanel';
import { AIInsightCard } from '../components/dashboard/AIInsightCard';
import { StorageWidget } from '../components/dashboard/StorageWidget';
import { DashboardEmptyState } from '../components/dashboard/DashboardEmptyState';
import { CampaignService, Campaign } from '../services/data/campaigns';
import { ArrowRight, Calendar, Camera } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Migrate any legacy data first
    CampaignService.migrateLegacy();
    
    // Load all campaigns
    const loadData = async () => {
       const all = await CampaignService.getAll();
       setCampaigns(all);
       if (all.length > 0) {
          setActiveCampaign(all[0]); // Default to most recent
       }
       setIsLoading(false);
    };

    loadData();
    window.addEventListener('campaignsUpdated', loadData);
    return () => window.removeEventListener('campaignsUpdated', loadData);
  }, []);

  const handleNewShoot = () => {
    localStorage.removeItem('wizard_state');
    navigate('/shoot-wizard');
  };

  if (isLoading) return null;

  if (campaigns.length === 0) {
     return (
        <div className="space-y-8 animate-in fade-in duration-500">
           <DashboardHeader 
              title="Dashboard" 
              status="Overview" 
              onNewShoot={handleNewShoot} 
           />
           <DashboardEmptyState />
        </div>
     );
  }

  // Use the active campaign data for the dashboard view
  // Adapt legacy structure if needed
  const displayCampaign = activeCampaign ? {
     ...activeCampaign.data,
     status: activeCampaign.status,
     title: activeCampaign.title,
     progress: activeCampaign.progress
  } : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <DashboardHeader 
        title={activeCampaign?.title || 'Dashboard'} 
        status={activeCampaign?.status || 'Active'} 
        onNewShoot={handleNewShoot} 
      />

      {/* Campaign Switcher (If multiple) */}
      {campaigns.length > 1 && (
         <div className="flex gap-4 overflow-x-auto pb-2">
            {campaigns.map(c => (
               <button
                  key={c.id}
                  onClick={() => setActiveCampaign(c)}
                  className={`flex items-center gap-3 p-3 pr-6 rounded-lg border transition-all min-w-[200px] ${
                     activeCampaign?.id === c.id 
                     ? 'bg-[#1A1A1A] text-white border-black shadow-md' 
                     : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}
               >
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center ${activeCampaign?.id === c.id ? 'bg-white/10' : 'bg-gray-100'}`}>
                     {c.type === 'event' ? <Calendar size={18} /> : <Camera size={18} />}
                  </div>
                  <div className="text-left">
                     <div className="text-xs font-bold uppercase tracking-wider opacity-70">{c.type}</div>
                     <div className="font-bold text-sm truncate max-w-[120px]">{c.title}</div>
                  </div>
               </button>
            ))}
         </div>
      )}

      <KPIGrid campaign={displayCampaign} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Activity & Actions */}
        <div className="lg:col-span-2 space-y-8">
           <ActionBanner />
           <ActivityFeed campaign={displayCampaign} />
           <DeliverablesList campaign={displayCampaign} totalShots={displayCampaign?.shotList?.length || 0} />
        </div>

        {/* Right Column: AI & Team */}
        <div className="space-y-8">
           <TeamPanel campaign={displayCampaign} />
           <AIInsightCard />
           <StorageWidget />
        </div>
      </div>
    </div>
  );
};
