
export interface BrandInput {
  brandName: string;
  websiteUrl: string;
  instagramHandle: string;
  lookbookFiles: File[]; // New: For Multimodal Analysis
}

export interface BrandAuditResult {
  brand_profile: {
    category: string;
    aesthetic_keywords: string[];
    price_positioning: string;
    target_audience: string;
    vibe_description: string;
    visual_archetype?: string; // New: AI-detected visual style
    palette?: string[]; // New: AI-detected colors
  };
  audit_score: number; // 0-100
  content_health: number; // 0-100
  visual_consistency_score?: number; // New: Score comparing Text vs Image vibe
  strategic_advice: Array<{
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
  }>;
  competitors: string[];
  market_gap: string;
}

export interface CompetitorData {
  name: string;
  estimated_price_point: number;
}

export interface BrandProfile extends Omit<BrandInput, 'lookbookFiles'> {
  id?: string;
  userId?: string;
  auditResult?: BrandAuditResult;
  lastAuditedAt?: string;
}
