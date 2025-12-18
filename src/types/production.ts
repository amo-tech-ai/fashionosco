
import { TimelineItem } from './event-tools';

export type ReadinessStatus = 'arrived' | 'in-makeup' | 'dressed' | 'ready' | 'pending';
export type SampleStatus = 'awaiting' | 'on-set' | 'shot' | 'returned';
export type RightsTier = 'social' | 'commercial' | 'unlimited';

export interface TalentStatus {
  id: string;
  name: string;
  role: string;
  status: ReadinessStatus;
  assignment?: string;
}

export interface ProductSample {
  id: string;
  name: string;
  sku: string;
  status: SampleStatus;
  isHero: boolean;
  image: string;
  location?: string;
}

export interface UsageRight {
  id: string;
  assetName: string;
  thumbnail: string;
  tier: RightsTier;
  expiryDate: string;
  status: 'active' | 'expiring' | 'expired';
}

export interface EnvironmentalSignals {
  weather: {
    condition: 'sunny' | 'rain' | 'overcast' | 'golden-hour';
    temp: string;
    icon: string;
  };
  travelRisk: 'Low' | 'Medium' | 'High';
}

export interface CallSheetBlock extends TimelineItem {
  location_name: string;
  talent_required: string[];
  is_outdoor: boolean;
  ai_note?: string;
}

export interface ProductionCue extends TimelineItem {
  audioCue: string;
  lightingCue: string;
  stageCue: string;
  isComplete: boolean;
}

export interface ProductionState {
  isLive: boolean;
  startTime: string | null;
  activeCueId: string | null;
  talent: TalentStatus[];
  cues: ProductionCue[];
}
