
export interface ConciergeAction {
  type: 'navigate' | 'filter' | 'search' | 'info';
  payload: string;
  label: string;
}

export interface ConciergeResponse {
  reply: string;
  actions: ConciergeAction[];
}

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export const talkToConcierge = async (message: string, context: any = {}): Promise<ConciergeResponse> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Use Gemini to parse intent and return structured navigation actions
    const response = await fetch(`${SUPABASE_FUNCTION_URL}/concierge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ message, context }),
    });

    if (!response.ok) throw new Error('Concierge service unavailable');
    return await response.json();

  } catch (error) {
    console.warn('Concierge Fallback Triggered:', error);
    // Sophisticated mock logic for offline/demo
    const lower = message.toLowerCase();
    if (lower.includes('shoot') || lower.includes('photo')) {
        return {
            reply: "The studio is ready for a new production. Shall we initialize the Shoot Wizard for your next campaign?",
            actions: [{ type: 'navigate', payload: '/shoot-wizard', label: 'Start Shoot Wizard' }]
        };
    }
    if (lower.includes('talent') || lower.includes('model') || lower.includes('find')) {
        return {
            reply: "Our network currently has 14 verified pros available for your SS25 window. Would you like to view the matching directory?",
            actions: [{ type: 'navigate', payload: '/directory', label: 'Explore Directory' }]
        };
    }
    return {
        reply: "I am your FashionOS Concierge. I can help you plan a shoot, audit your brand, or find talent. How shall we optimize your workflow today?",
        actions: [
            { type: 'navigate', payload: '/shoot-wizard', label: 'Plan Shoot' },
            { type: 'navigate', payload: '/dashboard/brand', label: 'Brand Intel' }
        ]
    };
  }
};
