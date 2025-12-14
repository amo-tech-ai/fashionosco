
import { BrandProfile } from '../../types/brand';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export interface BrandPulseData {
  metrics: {
    sales_trend: string;
    retailers_count: number;
    sell_through: string;
  };
  insight: {
    title: string;
    description: string;
    action: string;
  };
  notifications: Array<{
    title: string;
    desc: string;
    time: string;
    type: 'order' | 'alert' | 'press';
  }>;
}

const MOCK_PULSE: BrandPulseData = {
  metrics: {
    sales_trend: "+15%",
    retailers_count: 24,
    sell_through: "72%"
  },
  insight: {
    title: "Trending: 'Quiet Outdoors'",
    description: "Search volume for 'Technical Linen' is up 200%. Your 'Safari Jacket' fits this trend perfectly. Consider moving it to your homepage.",
    action: "Update Visual Merchandising"
  },
  notifications: [
    { title: "New Wholesale Order", desc: "Boutique 'Le Marais' requested 40 units of Silk Blouse.", time: "2h ago", type: "order" },
    { title: "Production Alert", desc: "Fabric shipment for 'Summer Linen' delayed by 2 days.", time: "5h ago", type: "alert" },
    { title: "Press Mention", desc: "Vogue.com featured 'Oversized Trench' in 'Top 10 Coats'.", time: "1d ago", type: "press" }
  ]
};

export const getBrandPulse = async (profile: BrandProfile | null): Promise<BrandPulseData> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock brand pulse');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_PULSE), 1500));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/get-brand-pulse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ 
        brandName: profile?.brandName || 'My Brand',
        category: profile?.auditResult?.brand_profile?.category || 'Fashion'
      }),
    });

    if (!response.ok) throw new Error('Failed to fetch brand pulse');
    return await response.json();
  } catch (error) {
    console.warn('Brand Pulse Fallback:', error);
    return MOCK_PULSE;
  }
};
