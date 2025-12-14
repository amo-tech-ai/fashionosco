
const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export interface PricingResult {
  cogs: number;
  wholesale_price: number;
  rrp: number;
  achieved_margin: string;
  breakdown: Array<{ label: string; value: number; note: string }>;
  strategy_note: string;
}

const MOCK_PRICING: PricingResult = {
  cogs: 45.50,
  wholesale_price: 115.00,
  rrp: 285.00,
  achieved_margin: "84%",
  breakdown: [
    { label: "Landed Cost (COGS)", value: 45.50, note: "Sum of Fabric ($15), Labor ($22), Logistics ($8.50)" },
    { label: "Wholesale Margin", value: 60.4, note: "60% Margin at Wholesale" },
    { label: "Retail Markup", value: 2.5, note: "2.5x Markup from Wholesale" }
  ],
  strategy_note: "Calculated RRP of $287.50 rounded down to $285.00 for psychological pricing compliance. Maintains a healthy >80% gross margin allowing for seasonal markdowns."
};

export const calculatePricingStrategy = async (costs: Record<string, number>, targetMargin: number, category: string): Promise<PricingResult> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock pricing');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_PRICING), 2000));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/calculate-pricing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ costs, targetMargin, category }),
    });

    if (!response.ok) throw new Error('Failed to calculate pricing');
    return await response.json();
  } catch (error) {
    console.warn('Pricing Fallback:', error);
    return MOCK_PRICING;
  }
};
