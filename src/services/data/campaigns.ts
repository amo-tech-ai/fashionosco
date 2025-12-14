
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
  totalPrice?: number;
  location?: string;
  createdAt: string;
  lastUpdated: string;
  user_id?: string;
}

const STORAGE_KEY = 'fashionos_campaigns';

export const CampaignService = {
  // Fetch all campaigns for the logged-in user
  getAll: async (): Promise<Campaign[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Authenticated: Fetch from DB (RLS will filter by client_id automatically)
        const { data, error } = await supabase
          .from('shoots') 
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.warn('Supabase fetch error (using fallback):', error.message);
          throw error;
        }
        
        // Map DB fields to Campaign Interface
        return data.map((item: any) => ({
           id: item.id,
           type: mapDbTypeToUiType(item.shoot_type),
           title: item.title || 'Untitled Project',
           status: mapDbStatusToUi(item.status),
           client: 'FashionOS User', 
           date: item.booking_date,
           location: item.location,
           totalPrice: item.total_price,
           progress: calculateProgress(item.status),
           data: item.brief_data || {}, 
           thumbnail: item.brief_data?.moodBoardImages?.[0] || undefined,
           createdAt: item.created_at,
           lastUpdated: item.updated_at,
           user_id: item.client_id
        }));
      }
    } catch (e) {
      // Silent fail to LocalStorage for Demo Mode/Offline
    }

    // Fallback for Demo/Offline
    const localData = localStorage.getItem(STORAGE_KEY);
    return localData ? JSON.parse(localData) : [];
  },

  // Save or Update a campaign
  save: async (campaign: Campaign): Promise<Campaign | null> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Safe mapping for DB Enum constraints
        // If it's an event, we might need to store it as 'custom' if 'event' isn't in the enum
        const dbShootType = campaign.type === 'event' ? 'custom' : campaign.type;

        const payload = {
           title: campaign.title,
           shoot_type: dbShootType,
           status: campaign.status.toLowerCase().replace(' ', '_'), 
           booking_date: campaign.date,
           location: campaign.data.location || campaign.location,
           total_price: campaign.totalPrice || campaign.data.totalPrice,
           deposit_amount: campaign.data.deposit,
           deposit_paid: true, 
           brief_data: campaign.data, // Stores full state including real 'type'
           client_id: session.user.id,
           updated_at: new Date().toISOString()
        };

        const isNew = campaign.id.startsWith('SHOOT-') || campaign.id.startsWith('EVT-') || campaign.id.startsWith('legacy-');
        
        let query = supabase.from('shoots');
        
        const { data, error } = isNew 
            ? await query.insert(payload).select().single()
            : await query.update(payload).eq('id', campaign.id).select().single();

        if (error) {
            console.error("DB Write Error:", error);
            throw error; // Fallback to local
        }

        if (data) {
            return {
                ...campaign,
                id: data.id, 
                createdAt: data.created_at,
                lastUpdated: data.updated_at
            };
        }
      }
    } catch (e) {
      console.warn("Saving to LocalStorage (Offline/Demo Mode)");
      saveToLocalStorage(campaign);
    }
    return campaign;
  },

  // Update specific fields of a campaign
  update: async (id: string, updates: Partial<Campaign>): Promise<void> => {
      try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
              const payload: any = { updated_at: new Date().toISOString() };
              if (updates.status) payload.status = updates.status.toLowerCase().replace(' ', '_');
              if (updates.data) payload.brief_data = updates.data;
              
              const { error } = await supabase.from('shoots').update(payload).eq('id', id);
              if (error) throw error;
          } else {
              throw new Error("No session");
          }
      } catch (e) {
          // Local storage update fallback
          const campaigns = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
          const index = campaigns.findIndex((c: Campaign) => c.id === id);
          if (index >= 0) {
              campaigns[index] = { ...campaigns[index], ...updates, lastUpdated: new Date().toISOString() };
              localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
              window.dispatchEvent(new Event('campaignsUpdated'));
          }
      }
  },

  migrateLegacy: (): void => {
    const legacy = localStorage.getItem('active_campaign');
    if (legacy) {
      try {
        const data = JSON.parse(legacy);
        if (data.title) {
            saveToLocalStorage({
                id: `legacy-${Date.now()}`,
                type: 'shoot',
                title: `${data.shootType || 'Custom'} Shoot`,
                status: 'Planning',
                client: 'FashionOS Studio',
                date: data.date,
                progress: 10,
                data: data,
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            });
        }
        localStorage.removeItem('active_campaign');
      } catch (e) {}
    }
  }
};

// --- Helpers ---

const saveToLocalStorage = (campaign: Campaign) => {
    const campaigns = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const index = campaigns.findIndex((c: Campaign) => c.id === campaign.id);
    
    // Safety: Remove huge base64 strings if present to avoid QuotaExceeded
    const safeCampaign = { ...campaign };
    if (safeCampaign.data?.moodBoardImages) {
        safeCampaign.data.moodBoardImages = safeCampaign.data.moodBoardImages.map((img: any) => 
            (typeof img === 'string' && img.length > 5000) ? 'placeholder_image_url' : img
        );
    }

    if (index >= 0) {
        campaigns[index] = safeCampaign;
    } else {
        campaigns.unshift(safeCampaign);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
    window.dispatchEvent(new Event('campaignsUpdated'));
};

const mapDbStatusToUi = (status: string): string => {
    const map: Record<string, string> = {
        'draft': 'Draft',
        'planning': 'Planning',
        'pre_production': 'Pre-Production',
        'production': 'Production',
        'post_production': 'Post-Production',
        'completed': 'Completed'
    };
    return map[status] || status.charAt(0).toUpperCase() + status.slice(1);
};

const mapDbTypeToUiType = (type: string): 'shoot' | 'event' => {
    // If DB stores 'custom', we check brief_data in the main object, 
    // but for the list view, we default to 'shoot' unless strictly 'event'
    return type === 'event' ? 'event' : 'shoot'; 
};

const calculateProgress = (status: string): number => {
    const map: Record<string, number> = {
        'draft': 10,
        'planning': 25,
        'pre_production': 40,
        'production': 60,
        'post_production': 80,
        'completed': 100
    };
    return map[status] || 15;
};
