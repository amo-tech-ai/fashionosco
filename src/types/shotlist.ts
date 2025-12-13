
import { Shot } from './ai';

export interface ShotItem extends Shot {
  status: 'Draft' | 'Approved' | 'Shot';
  model: string;
  outfit: string;
}

export type ShotListStats = {
  total: number;
  completed: number;
};
