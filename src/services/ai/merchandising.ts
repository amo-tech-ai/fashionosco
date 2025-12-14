
import { CartItem } from '../../types/wholesale';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export interface MerchandisingAnalysis {
  score: number;
  summary: string;
  suggestions: Array<{
    type: 'opportunity' | 'warning' | 'tip';
    message: string;
    action?: string;
  }>;
  potential_margin: string;
}

const MOCK_ANALYSIS: MerchandisingAnalysis = {
  score: 75,
  summary: "Solid assortment of core styles. You're close to the next discount tier.",
  suggestions: [
    { type: "opportunity", message: "Increase order by $350 to unlock 5% volume discount.", action: "Add Best Sellers" },
    { type: "tip", message: "Knitwear is trending for SS25. Consider deepening your depth in the Cashmere Sweater.", action: "View Knitwear" },
    { type: "warning", message: "Your dress-to-outerwear ratio is high. Consider adding blazers for balance." }
  ],
  potential_margin: "$4,250 estimated retail revenue"
};

export const analyzeCart = async (cart: CartItem[], totalValue: number): Promise<MerchandisingAnalysis> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!anonKey) {
      return new Promise(resolve => setTimeout(() => resolve(MOCK_ANALYSIS), 1500));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/analyze-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ cart, totalValue }),
    });

    if (!response.ok) throw new Error('Failed to analyze order');
    return await response.json();
  } catch (error) {
    console.warn('AI Merchandising Fallback:', error);
    return MOCK_ANALYSIS;
  }
};
