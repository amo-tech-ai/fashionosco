
import { supabase } from '../lib/supabase';

export interface SystemStatus {
  supabaseConnected: boolean;
  aiConfigured: boolean;
  storageEnabled: boolean;
  mode: 'demo' | 'live';
}

export const checkSystemStatus = async (): Promise<SystemStatus> => {
  const hasAnonKey = !!import.meta.env.VITE_SUPABASE_ANON_KEY;
  const hasUrl = !!import.meta.env.VITE_SUPABASE_URL;
  
  let supabaseConnected = false;
  
  if (hasAnonKey && hasUrl) {
    try {
      // Simple ping to check connection (e.g. fetching session)
      const { error } = await supabase.auth.getSession();
      supabaseConnected = !error;
    } catch (e) {
      supabaseConnected = false;
    }
  }

  // AI uses Edge Functions which rely on Supabase being connected
  const aiConfigured = supabaseConnected;

  return {
    supabaseConnected,
    aiConfigured,
    storageEnabled: supabaseConnected,
    mode: supabaseConnected ? 'live' : 'demo'
  };
};
