
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Campaign } from '../services/data/campaigns';
import { useCampaigns } from '../hooks/useCampaigns';

interface ActiveCampaignContextType {
  activeCampaign: Campaign | null;
  setActiveCampaignId: (id: string) => void;
  isLoading: boolean;
  refreshCampaign: () => void;
}

const ActiveCampaignContext = createContext<ActiveCampaignContextType | undefined>(undefined);

export const ActiveCampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { campaigns, loading: campaignsLoading, refresh } = useCampaigns();
  const [activeId, setActiveId] = useState<string | null>(localStorage.getItem('active_campaign_id'));
  
  // Derive active campaign from list
  const activeCampaign = campaigns.find(c => c.id === activeId) || campaigns[0] || null;

  useEffect(() => {
    if (activeId) {
      localStorage.setItem('active_campaign_id', activeId);
    } else if (campaigns.length > 0) {
        // Default to first if none selected
        setActiveId(campaigns[0].id);
    }
  }, [activeId, campaigns]);

  return (
    <ActiveCampaignContext.Provider value={{ 
      activeCampaign, 
      setActiveCampaignId: setActiveId, 
      isLoading: campaignsLoading,
      refreshCampaign: refresh
    }}>
      {children}
    </ActiveCampaignContext.Provider>
  );
};

export const useActiveCampaign = () => {
  const context = useContext(ActiveCampaignContext);
  if (context === undefined) {
    throw new Error('useActiveCampaign must be used within an ActiveCampaignProvider');
  }
  return context;
};
