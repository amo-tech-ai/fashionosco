import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardEmptyState } from '../components/dashboard/DashboardEmptyState';
import { ShootDashboard } from '../components/dashboard/shoot/ShootDashboard';
import { EventDashboard } from '../components/dashboard/events/EventDashboard';
import { DailyBriefing } from '../components/dashboard/DailyBriefing';
import { ProductionTaskBoard } from '../components/dashboard/tasks/ProductionTaskBoard';
import { useCampaigns } from '../hooks/useCampaigns';
import { useActiveCampaign } from '../contexts/ActiveCampaignContext';
import { Calendar, Camera, Loader2, Zap } from 'lucide-react';

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

  const displayCampaign = activeCampaign ? {
     ...activeCampaign.data,
     id: activeCampaign.id,
     type: activeCampaign.type,
     status: activeCampaign.status,
     title: activeCampaign.title,
     progress: activeCampaign.progress,
     shotList: activeCampaign.data?.shotList || [],
     moodBoardImages: activeCampaign.data?.moodBoardImages || []
  } : null;

  return (
    <div className="space-y-12 animate-in fade-in duration-500 p-6 md:p-8 overflow-y-auto h-full hide-scrollbar">
      
      <DashboardHeader 
        title={activeCampaign?.title || 'Dashboard'} 
        status={activeCampaign?.status || 'Active'} 
        onNewShoot={handleNewShoot} 
      />

      <DailyBriefing />

      {campaigns.length > 1 && (
         <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {campaigns.map(c => (
               <button
                  key={c.id}
                  onClick={() => setActiveCampaignId(c.id)}
                  className={`flex items-center gap-3 p-3 pr-6 rounded-2xl border transition-all min-w-[220px] flex-shrink-0 ${
                     activeCampaign?.id === c.id 
                     ? 'bg-[#1A1A1A] text-white border-black shadow-xl' 
                     : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                  }`}
               >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCampaign?.id === c.id ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-400'}`}>
                     {c.type === 'event' ? <Calendar size={18} /> : <Camera size={18} />}
                  </div>
                  <div className="text-left min-w-0">
                     <div className="text-[9px] font-black uppercase tracking-widest opacity-50">{c.type}</div>
                     <div className="font-bold text-sm truncate">{c.title}</div>
                  </div>
               </button>
            ))}
         </div>
      )}

      {activeCampaign?.type === 'event' ? (
         <EventDashboard campaign={displayCampaign} />
      ) : (
         <ShootDashboard campaign={displayCampaign} />
      )}

      <section className="pt-10 border-t border-gray-100">
         <ProductionTaskBoard />
      </section>
    </div>
  );
};