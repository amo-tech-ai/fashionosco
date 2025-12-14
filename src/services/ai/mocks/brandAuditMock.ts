
import { BrandAuditResult } from '../../../types/brand';

export const MOCK_AUDIT_RESULT: BrandAuditResult = {
  brand_profile: {
    category: "Contemporary Womenswear",
    aesthetic_keywords: ["Minimalist", "Scandinavian", "Sustainable", "Earth Tones"],
    price_positioning: "$$$ (Premium)",
    target_audience: "Urban professionals, 25-40, eco-conscious",
    vibe_description: "Effortless elegance with a focus on natural fibers and neutral palettes.",
    visual_archetype: "The Modern Essentialist",
    palette: ["#F5F5F5", "#D3C0AC", "#2C2C2C", "#8B9A91"]
  },
  audit_score: 78,
  content_health: 72,
  visual_consistency_score: 85,
  signals: {
    visual_quality: "High",
    brand_voice_consistency: "Strong",
    market_positioning: "Clear",
    website_ux: "Modern",
    social_presence: "Active"
  },
  strategic_advice: [
    {
      title: "Adopt 'Lo-Fi' Luxury Reels",
      description: "Competitors like The Row use raw, handheld video to convey authenticity. Your current feed is too polished. Switch to iPhone-shot BTS content for 3 posts/week to increase relatability and engagement.",
      impact: "High"
    },
    {
      title: "Leverage 'Educational' Carousels",
      description: "Data shows 'How to Style' posts drive 2x more Saves than product shots in your niche. Create step-by-step styling guides for your Linen Blazer to boost algorithm ranking.",
      impact: "High"
    },
    {
      title: "Optimize SEO Keywords",
      description: "High search volume for 'Organic Capsule Wardrobe' is being captured by competitors. Add these exact keywords to your Instagram bio and website H1 tags immediately.",
      impact: "Medium"
    }
  ],
  competitors: ["The Row", "COS", "Arket", "Toteme"],
  market_gap: "Affordable luxury linen with inclusive sizing."
};
