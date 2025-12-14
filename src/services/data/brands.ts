
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

        if (data) {
          return {
            ...data,
            // Map DB fields to frontend types if necessary
            brandName: data.name,
            websiteUrl: data.website_url,
            instagramHandle: data.instagram_handle,
            auditResult: data.audit_report
          };
        }
      }
    } catch (e) {
      console.warn("Using local brand profile");
    }

    // Fallback
    const local = localStorage.getItem(STORAGE_KEY);
    return local ? JSON.parse(local) : null;
  },

  save: async (profile: BrandProfile): Promise<void> => {
    // 1. Save Local
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
