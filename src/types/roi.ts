export interface ROIMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export interface CompetitorComparison {
  brandName: string;
  overlap: number; // 0-100
  advantage: string;
  disadvantage: string;
}

export interface ROIPrediction {
  id: string;
  campaignId: string;
  overallImpactScore: number; // 0-100
  estimatedReach: { min: number; max: number };
  conversionLift: number; // percentage
  metrics: ROIMetric[];
  competitorAnalysis: CompetitorComparison[];
  reasoning: string;
  generatedAt: string;
}