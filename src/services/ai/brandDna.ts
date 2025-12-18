import { BrandAuditResult } from '../../types/brand';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export const auditBrandDna = async (website: string, social: string): Promise<BrandAuditResult> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!anonKey || anonKey === 'placeholder') {
      // Return mock for development/demo
      await new Promise(r => setTimeout(r, 2000));
      return {
        brand_profile: {
          category: "High-End Streetwear",
          aesthetic_keywords: ["Noir", "Cyberpunk", "Urban Brutalist"],
          price_positioning: "$$$ (Luxury)",
          target_audience: "Gen-Z Tastemakers, 18-28",
          vibe_description: "Futuristic silhouettes meeting raw urban textures.",
          palette: ["#000000", "#FF0000", "#1A1A1A"]
        },
        audit_score: 84,
        content_health: 70,
        visual_consistency_score: 90,
        signals: {
          visual_quality: "High",
          brand_voice_consistency: "Strong",
          market_positioning: "Clear",
          website_ux: "Modern",
          social_presence: "Active"
        },
        strategic_advice: [],
        competitors: ["Acronym", "A-Cold-Wall*"],
        market_gap: "Luxury technical wear for extreme urban climates."
      } as any;
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/audit-brand-dna`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${anonKey}` },
      body: JSON.stringify({ website, social }),
    });

    if (!response.ok) throw new Error("DNA Analysis Service unavailable");
    return await response.json();
  } catch (error) {
    console.error("AI DNA Error:", error);
    throw error;
  }
};