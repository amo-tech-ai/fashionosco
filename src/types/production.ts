import { TimelineItem } from './event-tools';

export type ReadinessStatus = 'arrived' | 'in-makeup' | 'dressed' | 'ready' | 'pending';

export interface TalentStatus {
  id: string;
  name: string;
  role: string;
  status: ReadinessStatus;
  assignment?: string; // e.g., "Look 04"
}

export interface ProductionCue extends TimelineItem {
  audioCue?: string;
  lightingCue?: string;
  stageCue?: string;
  isComplete: boolean;
}

export interface ProductionState {
  isLive: boolean;
  startTime: string | null;
  activeCueId: string | null;
  talent: TalentStatus[];
  cues: ProductionCue[];
}