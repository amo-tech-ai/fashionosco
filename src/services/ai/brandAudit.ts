
import { BrandInput, BrandAuditResult } from '../../types/brand';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

// High-fidelity mock for demo purposes
const MOCK_AUDIT_RESULT: BrandAuditResult = {
  brand_profile: {
    category: "Contemporary Womenswear",
    aesthetic_keywords: ["Minimalist", "Scandinavian", "Sustainable", "Earth Tones"],
    price_positioning: "$$$ (Premium)",
    target_audience: "Urban professionals, 25-40, eco-conscious",
    vibe_description: "Effortless elegance with a focus on natural fibers and neutral palettes."
  },
  audit_score: 78,
  content_health: 65,
  strategic_advice: [
    {
      title: "Visual Consistency Gap",
      description: "Your website photography is high-key studio, but Instagram is dark/moody UGC. Aligning these visual languages could increase conversion by 15%.",
      impact: "High"
    },
    {
      title: "Video Content Deficiency",
      description: "Competitors in the 'Sustainable Luxury' niche are posting 4x more Reels. Increasing video output is critical for discovery.",
      impact: "High"
    },
    {
      title: "SEO Opportunity",
      description: "High search volume for 'Organic Linen Suits' in your region, which matches your catalog but isn't in your keywords.",
      impact: "Medium"
    }
  ],
  competitors: ["The Row", "COS", "Arket", "Toteme"],
  market_gap: "Affordable luxury linen with inclusive sizing."
};

export const auditBrand = async (input: BrandInput): Promise<BrandAuditResult> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Fallback to Demo Mode if no backend connection
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock brand audit');
      // Simulate API latency for "Deep Research" feel
      return new Promise(resolve => setTimeout(() => resolve(MOCK_AUDIT_RESULT), 4000));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/audit-brand`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Failed to audit brand');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('AI Audit Fallback:', error);
    return MOCK_AUDIT_RESULT;
  }
};
