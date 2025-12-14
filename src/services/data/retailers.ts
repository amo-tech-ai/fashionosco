
import { supabase } from '../../lib/supabase';

export interface RetailerApp {
  id: string;
  storeName: string;
  website: string;
  location: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  risk_score: number;
  aesthetic_tier: string;
  verdict: string;
  date: string;
  email?: string;
  contactName?: string;
}

const STORAGE_KEY = 'fashionos_retailer_applications';

export const RetailerService = {
  getAll: async (): Promise<RetailerApp[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        // In a real schema, this would be 'wholesale_applications' linked to the brand
        const { data, error } = await supabase
          .from('wholesale_applications')
          .select('*')
          .eq('brand_id', session.user.id) // Assuming brand is the user
          .order('created_at', { ascending: false });

        if (data && !error) {
          return data.map((d: any) => ({
             id: d.id,
             storeName: d.store_name,
             website: d.website_url,
             location: d.location,
             status: d.status,
             risk_score: d.risk_score,
             aesthetic_tier: d.aesthetic_tier,
             verdict: d.ai_verdict,
             date: d.created_at
          }));
        }
      }
    } catch (e) {
      // Fallback
    }

    const local = localStorage.getItem(STORAGE_KEY);
    return local ? JSON.parse(local) : [];
  },

  save: async (app: RetailerApp): Promise<void> => {
    // 1. Local
    const existing = await RetailerService.getAll();
    const updated = [app, ...existing.filter(e => e.id !== app.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // 2. Remote
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
            await supabase.from('wholesale_applications').upsert({
                id: app.id.includes('app-') ? undefined : app.id, // Let DB gen UUID if new
                brand_id: session.user.id,
                store_name: app.storeName,
                website_url: app.website,
                location: app.location,
                status: app.status,
                risk_score: app.risk_score,
                aesthetic_tier: app.aesthetic_tier,
                ai_verdict: app.verdict,
                created_at: app.date
            });
        }
    } catch (e) {
        console.warn('Failed to sync retailer app to DB');
    }
  },

  updateStatus: async (id: string, status: RetailerApp['status']): Promise<void> => {
      const apps = await RetailerService.getAll();
      const target = apps.find(a => a.id === id);
      if (target) {
          target.status = status;
          await RetailerService.save(target);
      }
  }
};
