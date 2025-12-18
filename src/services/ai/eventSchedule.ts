import { TimelineItem } from '../../types/event-tools';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

const MOCK_TIMELINE: TimelineItem[] = [
  { id: '1', time: '16:00', duration: '120m', title: 'Load In & Light Focus', description: 'Tech crew arrival. Rigging check. Audio soundscape verification.', category: 'logistics', status: 'confirmed' },
  { id: '2', time: '18:00', duration: '60m', title: 'Model Hair & Makeup', description: 'Backstage prep begins. First looks approved by lead stylist.', category: 'runway', status: 'confirmed' },
  { id: '3', time: '19:00', duration: '45m', title: 'Rehearsal / Music Sync', description: 'Full walkthrough with model lineup and visual cues.', category: 'runway', status: 'pending' },
  { id: '4', time: '19:45', duration: '15m', title: 'House Open', description: 'Guest arrival. Front of house seating management.', category: 'hospitality', status: 'pending' },
  { id: '5', time: '20:00', duration: '20m', title: 'Main Show Start', description: 'Opening look. Visual loop active. Catwalk sequence 01-30.', category: 'runway', status: 'pending' },
  { id: '6', time: '20:20', duration: '10m', title: 'Finale & Bow', description: 'Collective walk. Designer entrance. Press photo call.', category: 'runway', status: 'pending' },
  { id: '7', time: '20:30', duration: '90m', title: 'Cocktail Reception', description: 'Post-show networking and VIP interviews.', category: 'hospitality', status: 'pending' }
];

export const generateEventSchedule = async (
  eventTitle: string, 
  guestCount: number, 
  startTime: string = '19:00',
  refinement?: string,
  currentTimeline?: TimelineItem[]
): Promise<TimelineItem[]> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!anonKey) {
      console.log('✨ Demo Mode: AI Refinement (Simulated)');
      if (refinement && currentTimeline) {
        return [...currentTimeline, {
          id: `refine-${Date.now()}`,
          time: '21:30',
          duration: '30m',
          title: `Refined Segment`,
          description: `AI addition based on: ${refinement}`,
          category: 'logistics',
          status: 'pending'
        }];
      }
      return new Promise(resolve => setTimeout(() => resolve(MOCK_TIMELINE), 2500));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/generate-event-schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ 
        eventType: 'runway', 
        guestCount, 
        startTime,
        refinement,
        currentTimeline
      }),
    });

    if (!response.ok) throw new Error('Failed to generate schedule');
    
    const data = await response.json();
    const rawItems = data.timeline || [];
    return rawItems.map((item: any, i: number) => ({
        ...item,
        id: item.id || `ai-event-${Date.now()}-${i}`,
        status: item.status || 'pending'
    }));

  } catch (error) {
    console.warn('AI Schedule Fallback:', error);
    return MOCK_TIMELINE;
  }
};
