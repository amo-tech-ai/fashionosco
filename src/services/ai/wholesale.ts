
import { BuyerApplication, VettingResult } from '../../types/wholesale';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

const MOCK_VETTING_RESULT: VettingResult = {
  risk_score: 15,
  aesthetic_tier: "Contemporary",
  is_physical_store_verified: true,
  brands_stocked: ["Ganni", "Stine Goya", "Faithfull the Brand"],
  verdict: "Approve",
  reasoning: "Store has a verified physical location in a high-end district. Online presence shows stocking of peer brands. Low credit risk estimated."
};

export const vetBuyerApplication = async (app: BuyerApplication): Promise<VettingResult> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!anonKey) {
      console.log('✨ Demo Mode: Simulating buyer vetting');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_VETTING_RESULT), 3000));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/vet-buyer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(app),
    });

    if (!response.ok) throw new Error('Failed to vet buyer');
    return await response.json();
  } catch (error) {
    console.warn('AI Vetting Fallback:', error);
    return MOCK_VETTING_RESULT;
  }
};
