
const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export interface MarketAuditResult {
  trend_summary: string;
  trending_keywords: string[];
  competitors: Array<{
    name: string;
    item_name: string;
    price: string;
    notes: string;
  }>;
  pricing_matrix: {
    market_low: string;
    market_average: string;
    market_high: string;
  };
  opportunities: string[];
}

// Mock for Demo Mode
const MOCK_MARKET_DATA: MarketAuditResult = {
  trend_summary: "Linen is seeing a major resurgence for SS25, driven by the 'Old Money' aesthetic and a shift towards sustainable, breathable natural fibers. Earth tones (terracotta, sage) are dominating over stark whites.",
  trending_keywords: ["Organic Linen", "Relaxed Tailoring", "Quiet Luxury", "Breathable", "Earth Tones"],
  competitors: [
    { name: "Arket", item_name: "Oversized Linen Shirt", price: "$89", notes: "Mass market benchmark, high volume." },
    { name: "The Row", item_name: "Frannie Tunic", price: "$1,290", notes: "Luxury benchmark, sets the silhouette trend." },
    { name: "Reformation", item_name: "Tagliatelle Dress", price: "$248", notes: "Contemporary benchmark, key competitor." }
  ],
  pricing_matrix: {
    market_low: "$60 - $90",
    market_average: "$180 - $280",
    market_high: "$800+"
  },
  opportunities: [
    "Mid-market gap for tailored linen blazers under $300.",
    "Lack of bold prints in the sustainable linen sector."
  ]
};

export const getDeepMarketAudit = async (query: string, category: string, pricePoint?: string): Promise<MarketAuditResult> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock market audit');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_MARKET_DATA), 3000));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/deep-market-audit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ query, category, pricePoint }),
    });

    if (!response.ok) throw new Error('Failed to audit market');
    return await response.json();
  } catch (error) {
    console.warn('Market Audit Fallback:', error);
    return MOCK_MARKET_DATA;
  }
};
