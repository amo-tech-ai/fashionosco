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

export interface PipelineSummary {
  likelyToClose: Deal[];
  atRisk: Deal[];
  developing: Deal[];
}