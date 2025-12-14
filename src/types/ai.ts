
import { Product } from './products';

export interface Shot {
  id: string;
  name: string;
  description: string;
  angle: string;
  lighting: string;
  props?: string;
  priority: 'High' | 'Medium' | 'Low';
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
  turnaround: string;
  // New fields for refinement flow
  refinement?: string;
  currentShots?: Shot[];
  // New field for specific inventory items
  products?: Product[];
}
