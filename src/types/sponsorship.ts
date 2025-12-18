export interface SponsorMatch {
  id: string;
  brandName: string;
  category: string;
  fitScore: number;
  rationale: string;
  suggestedTier: 'Title' | 'Gold' | 'In-Kind';
  outreachAngle: string;
  logoPlaceholder: string;
}

export interface SponsorshipPulse {
  matches: SponsorMatch[];
  marketContext: string;
}