
import { TimelineItem } from '../../types/event-tools';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

const MOCK_TIMELINE: TimelineItem[] = [
  { id: '1', time: '16:00', duration: '120m', title: 'Load In & Light Focus', description: 'Tech crew arrival. Rigging check.', category: 'logistics', status: 'confirmed' },
  { id: '2', time: '18:00', duration: '60m', title: 'Model Hair & Makeup', description: 'Backstage prep begins. First looks.', category: 'runway', status: 'confirmed' },
  { id: '3', time: '19:00', duration: '45m', title: 'Dry Run / Rehearsal', description: 'Walkthrough with music cues.', category: 'runway', status: 'pending' },
  { id: '4', time: '19:45', duration: '15m', title: 'House Open', description: 'Guest arrival and seating.', category: 'hospitality', status: 'pending' },
  { id: '5', time: '20:00', duration: '20m', title: 'Show Start', description: 'Runway presentation.', category: 'runway', status: 'pending' },
  { id: '6', time: '20:30', duration: '60m', title: 'Cocktail Reception', description: 'Post-show drinks.', category: 'hospitality', status: 'pending' }
];

export const generateEventSchedule = async (eventType: string, guestCount: number, startTime: string = '19:00'): Promise<TimelineItem[]> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!anonKey) {
      return new Promise(resolve => setTimeout(() => resolve(MOCK_TIMELINE), 2000));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/generate-event-schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ eventType, guestCount, startTime }),
    });

    if (!response.ok) throw new Error('Failed to generate schedule');
    
    const data = await response.json();
    
    // Add IDs since AI might not generate unique ones
    return data.timeline.map((item: any, i: number) => ({
        ...item,
        id: `ai-event-${Date.now()}-${i}`
    }));

  } catch (error) {
    console.warn('AI Schedule Fallback:', error);
    return MOCK_TIMELINE;
  }
};
