
import { supabase } from '../../lib/supabase';

export interface Campaign {
  id: string;
  type: 'shoot' | 'event';
  title: string;
  status: string;
  client: string;
  date: string | null;
  progress: number;
  thumbnail?: string;
  data: any; // Full wizard state
  createdAt: string;
  lastUpdated: string;
  user_id?: string;
}

const STORAGE_KEY = 'fashionos_campaigns';

export const CampaignService = {
  // Hybrid Fetch: Try DB first, fallback to Local
  getAll: async (): Promise<Campaign[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Authenticated: Fetch from DB
        const { data, error } = await supabase
          .from('shoots') // Assuming 'shoots' table maps to campaigns for now
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Map DB fields to Campaign Interface if necessary
        return data.map((item: any) => ({
           id: item.id,
           type: item.shoot_type || 'shoot',
           title: item.title || 'Untitled Shoot',
           status: item.status || 'Planning',
           client: 'FashionOS User',
           date: item.booking_date,
           progress: 25,
           data: item.brief_data || {},
           createdAt: item.created_at,
           lastUpdated: item.updated_at
        }));
      }
    } catch (e) {
      console.warn("Offline or Demo Mode: Using LocalStorage");
    }

    // Fallback
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  save: async (campaign: Campaign): Promise<void> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Prepare payload for Supabase 'shoots' table
        const payload = {
           title: campaign.title,
           shoot_type: campaign.type,
           status: campaign.status.toLowerCase(),
           booking_date: campaign.date,
           brief_data: campaign.data,
           updated_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('shoots')
          .upsert(payload, { onConflict: 'id' }); // Note: Need real ID handling

        if (error) {
           console.error("Supabase Save Error", error);
           // Fallthrough to local storage so user doesn't lose work
        } else {
           return; // Success
        }
      }
    } catch (e) {
      console.warn("Saving to LocalStorage (Network/Auth unavailable)");
    }

    // Local Storage Fallback (Legacy)
    // CRITICAL: We must strip large images before saving to LocalStorage to prevent crashes
    const safeCampaign = { ...campaign };
    if (safeCampaign.data?.moodBoardImages) {
        // Store only the first image or a placeholder to save space
        // In a real app, these files must go to Storage Bucket
        safeCampaign.data.moodBoardImages = []; 
        safeCampaign.thumbnail = "https://placehold.co/400x400?text=Moodboard";
    }

    const campaigns = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const existingIndex = campaigns.findIndex((c: Campaign) => c.id === campaign.id);
    
    if (existingIndex >= 0) {
      campaigns[existingIndex] = safeCampaign;
    } else {
      campaigns.unshift(safeCampaign);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
    window.dispatchEvent(new Event('campaignsUpdated'));
  },

  migrateLegacy: (): void => {
    // Migration logic remains the same
    const legacy = localStorage.getItem('active_campaign');
    if (legacy) {
      try {
        const data = JSON.parse(legacy);
        const campaigns = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (!campaigns.find((c: any) => c.id === data.id)) {
            const campaign: Campaign = {
                id: data.id || `legacy-${Date.now()}`,
                type: 'shoot',
                title: `${data.shootType || 'Custom'} Shoot`,
                status: 'Migrated',
                client: 'FashionOS Studio',
                date: data.date,
                progress: 10,
                data: data,
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            };
            campaigns.push(campaign);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
        }
        localStorage.removeItem('active_campaign');
      } catch (e) {}
    }
  }
};
