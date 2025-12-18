import { SponsorMatch, SponsorshipPulse } from '../../types/sponsorship';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

const MOCK_SPONSORS: SponsorMatch[] = [
  {
    id: '1',
    brandName: 'Aesop',
    category: 'Skincare/Lifestyle',
    fitScore: 94,
    rationale: 'Alignment with minimalist aesthetic. Their recent focus on architectural retail fits your venue choice.',
    suggestedTier: 'In-Kind',
    outreachAngle: 'Focus on scent-scaping the venue to match the FW25 mood.',
    logoPlaceholder: 'A'
  },
  {
    id: '2',
    brandName: 'Casamigos',
    category: 'Spirits',
    fitScore: 88,
    rationale: 'High affinity with your core demographic (Creative Professionals, 25-40).',
    suggestedTier: 'Gold',
    outreachAngle: 'Signature cocktail bar in the VIP reception lounge.',
    logoPlaceholder: 'C'
  }
];

export const getSponsorMatches = async (context: any): Promise<SponsorshipPulse> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!anonKey) {
        return { matches: MOCK_SPONSORS, marketContext: "Demo mode active. Gemini 3 Pro would normally scan real-time market data for luxury partners." };
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/find-sponsors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${anonKey}` },
      body: JSON.stringify(context),
    });

    return await response.json();
  } catch (error) {
    console.warn('Sponsorship AI Fallback:', error);
    return { matches: MOCK_SPONSORS, marketContext: "Strategic fallback active." };
  }
};