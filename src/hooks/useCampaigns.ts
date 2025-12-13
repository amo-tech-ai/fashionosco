
import { useState, useEffect } from 'react';
import { Campaign, CampaignService } from '../services/data/campaigns';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useCampaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial Fetch
  useEffect(() => {
    let isMounted = true;

    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await CampaignService.getAll();
        if (isMounted) {
          setCampaigns(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCampaigns();

    // Listen for local storage updates (legacy fallback)
    const handleLocalUpdate = () => fetchCampaigns();
    window.addEventListener('campaignsUpdated', handleLocalUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('campaignsUpdated', handleLocalUpdate);
    };
  }, [user]);

  // Realtime Subscription
  useEffect(() => {
    if (!user) return;

    // Create a channel for the 'shoots' table
    const channel = supabase
      .channel('public:shoots')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'shoots',
          // Filter by client_id to only update for the current user's data
          // Note: RLS protects the initial fetch, but client-side filters help reduce noise if RLS allows it
          filter: `client_id=eq.${user.id}` 
        },
        (payload) => {
          console.log('Realtime update:', payload);
          // Refresh data on any change
          // Optimization: We could manually update the state based on payload to avoid a re-fetch
          CampaignService.getAll().then(setCampaigns); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { campaigns, loading, error, refresh: () => CampaignService.getAll().then(setCampaigns) };
};
