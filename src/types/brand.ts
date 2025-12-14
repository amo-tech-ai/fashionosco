
export interface BrandInput {
  brandName: string;
  websiteUrl: string;
  instagramHandle: string;
  lookbookFiles: File[];
}

export interface BrandSignals {
  visual_quality: 'High' | 'Medium' | 'Low';
  brand_voice_consistency: 'Strong' | 'Mixed' | 'Weak';
  market_positioning: 'Clear' | 'Vague';
  website_ux: 'Modern' | 'Outdated' | 'Basic';
  social_presence: 'Active' | 'Sparse' | 'None';
}

export interface BrandAuditResult {
  brand_profile: {
    category: string;
    aesthetic_keywords: string[];
    price_positioning: string;
    target_audience: string;
    vibe_description: string;
    visual_archetype?: string;
    palette?: string[];
  };
  // Deterministic Scores
  audit_score: number; // Calculated from signals
  content_health: number; // Calculated from signals
  visual_consistency_score: number; // Calculated from signals
  
  // AI Raw Output
  signals: BrandSignals;
  
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
