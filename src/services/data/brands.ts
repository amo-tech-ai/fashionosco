
import { supabase } from '../../lib/supabase';
import { BrandProfile } from '../../types/brand';

const STORAGE_KEY = 'fashionos_brand_profile';

export const BrandService = {
  get: async (): Promise<BrandProfile | null> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const { data, error } = await supabase
          .from('fashion_brands')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (data && !error) {
          return {
            id: data.id,
            userId: data.user_id,
            brandName: data.name,
            websiteUrl: data.website_url,
            instagramHandle: data.instagram_handle,
            auditResult: data.audit_report,
            lastAuditedAt: data.updated_at
          };
        }
      }
    } catch (e) {
      // Silent fail to local storage if DB fetch fails or no session
    }

    // Fallback
    const local = localStorage.getItem(STORAGE_KEY);
    return local ? JSON.parse(local) : null;
  },

  save: async (profile: BrandProfile): Promise<void> => {
    // 1. Save Local (Optimistic UI update)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event('brandProfileUpdated'));

    // 2. Save DB (if auth)
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const payload = {
          user_id: session.user.id,
          name: profile.brandName,
          website_url: profile.websiteUrl,
          instagram_handle: profile.instagramHandle,
          audit_report: profile.auditResult,
          brand_audit_score: profile.auditResult?.audit_score, // Sync score to top-level column
          updated_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('fashion_brands')
          .upsert(payload, { onConflict: 'user_id' });
          
        if (error) throw error;
      }
    } catch (e) {
      console.error("Failed to save brand to DB", e);
    }
  }
};
