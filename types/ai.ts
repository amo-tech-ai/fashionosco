import { Product } from './products';

export type DistributionChannel = 
  | 'instagram' 
  | 'amazon' 
  | 'facebook' 
  | 'pinterest' 
  | 'tiktok' 
  | 'youtube' 
  | 'website';

export type ShotTypeLabel = 
  | 'Hero' 
  | 'Detail' 
  | 'BTS' 
  | 'UGC-Style' 
  | 'Graphic' 
  | 'Video/Reel' 
  | 'Story' 
  | 'In-Feed Video';

export interface Shot {
  id: string;
  name: string;
  description: string;
  angle: string;
  lighting: string;
  props?: string;
  format: '9:16' | '4:5' | '1:1' | '16:9';
  type: ShotTypeLabel;
  priority: 'High' | 'Medium' | 'Low';
  channel_logic?: string;
  grounding_urls?: Array<{ title: string; uri: string }>;
}

export interface MoodBoardAnalysis {
  colors: string[];
  keywords: string[];
  lightingStyle: string;
  compositionStyle: string;
  suggestion: string;
  similarBrands: string[];
  recommendedProps: string[];
}

export interface GenerateShotListParams {
  shootType: string;
  numberOfItems: number;
  vibe: string;
  referenceBrands: string;
  channels: DistributionChannel[];
  turnaround: string;
  refinement?: string;
  currentShots?: Shot[];
  products?: Product[];
}