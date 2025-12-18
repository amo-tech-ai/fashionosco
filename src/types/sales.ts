export type DealHealth = 'high' | 'medium' | 'at-risk';

export interface Deal {
  id: string;
  clientName: string;
  projectType: string;
  value: number;
  health: DealHealth;
  closingProbability: number;
  daysInPipeline: number;
  momentumData: number[]; // Array of values for sparkline
  aiReasoning: string;
  lastTouch: string;
}

export type SalesEventType = 'email_received' | 'contract_signed' | 'meeting_scheduled' | 'proposal_viewed' | 'ai_alert';

export interface SalesActivityEvent {
  id: string;
  dealId: string;
  clientName: string;
  type: SalesEventType;
  title: string;
  description: string;
  timestamp: string;
  isHighPriority: boolean;
}

export interface PipelineSummary {
  likelyToClose: Deal[];
  atRisk: Deal[];
  developing: Deal[];
}