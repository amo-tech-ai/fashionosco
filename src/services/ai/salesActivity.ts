import { SalesActivityEvent } from '../../types/sales';

const MOCK_EVENTS: SalesActivityEvent[] = [
  {
    id: 'e1',
    dealId: '1',
    clientName: 'Maison Margiela',
    type: 'contract_signed',
    title: 'Initial SOW Signed',
    description: 'Procurement has approved the creative fee. Moving to venue deposit phase.',
    timestamp: '15m ago',
    isHighPriority: true
  },
  {
    id: 'e2',
    dealId: '3',
    clientName: 'A-Cold-Wall*',
    type: 'meeting_scheduled',
    title: 'Tech Walkthrough Set',
    description: 'Meeting with the digital production team scheduled for Tuesday 10:00 AM.',
    timestamp: '2h ago',
    isHighPriority: false
  },
  {
    id: 'e3',
    dealId: '2',
    clientName: 'Jacquemus',
    type: 'ai_alert',
    title: 'Communication Gap Alert',
    description: 'AI detected 14 days of inactivity. Competitor activity in their region is high.',
    timestamp: '4h ago',
    isHighPriority: true
  },
  {
    id: 'e4',
    dealId: '1',
    clientName: 'Maison Margiela',
    type: 'proposal_viewed',
    title: 'Proposal Viewed (4x)',
    description: 'Multiple stakeholders from the legal department are reviewing the usage rights.',
    timestamp: '6h ago',
    isHighPriority: false
  }
];

export const getSalesActivity = async (brandId?: string): Promise<SalesActivityEvent[]> => {
  // In production, this would fetch from Supabase and use Gemini to summarize logs
  // For now, return high-fidelity mock stream
  return new Promise(resolve => setTimeout(() => resolve(MOCK_EVENTS), 800));
};