
import { BrandInput, BrandAuditResult } from '../../types/brand';
import { compressBase64Image } from '../../utils/fileHelpers';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

// High-fidelity mock for demo purposes
const MOCK_AUDIT_RESULT: BrandAuditResult = {
  brand_profile: {
    category: "Contemporary Womenswear",
    aesthetic_keywords: ["Minimalist", "Scandinavian", "Sustainable", "Earth Tones"],
    price_positioning: "$$$ (Premium)",
    target_audience: "Urban professionals, 25-40, eco-conscious",
    vibe_description: "Effortless elegance with a focus on natural fibers and neutral palettes.",
    visual_archetype: "The Modern Essentialist",
    palette: ["#F5F5F5", "#D3C0AC", "#2C2C2C", "#8B9A91"]
  },
  // Scores are now conceptually derived from signals below
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

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const auditBrand = async (input: BrandInput): Promise<BrandAuditResult> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Fallback to Demo Mode if no backend connection
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock brand audit');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_AUDIT_RESULT), 4000));
    }

    // Process images if any
    let images: string[] = [];
    if (input.lookbookFiles && input.lookbookFiles.length > 0) {
       const rawImages = await Promise.all(input.lookbookFiles.slice(0, 3).map(fileToBase64));
       // Compress to ensure we don't hit payload limits
       images = await Promise.all(rawImages.map(img => compressBase64Image(img, 800, 0.7)));
       // Strip header
       images = images.map(img => img.split(',')[1]);
    }

    const payload = {
        brandName: input.brandName,
        websiteUrl: input.websiteUrl,
        instagramHandle: input.instagramHandle,
        images: images // Send visual data
    };

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/audit-brand`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(payload),
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
