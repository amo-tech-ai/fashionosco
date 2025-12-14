
export interface BrandInput {
  brandName: string;
  websiteUrl: string;
  instagramHandle: string;
}

export interface BrandAuditResult {
  brand_profile: {
    category: string;
    aesthetic_keywords: string[];
    price_positioning: string;
    target_audience: string;
    vibe_description: string;
  };
  audit_score: number; // 0-100
  content_health: number; // 0-100
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

export interface BrandProfile extends BrandInput {
  id?: string;
  userId?: string;
  auditResult?: BrandAuditResult;
  lastAuditedAt?: string;
}
