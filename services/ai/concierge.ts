export interface ConciergeAction {
  type: 'navigate' | 'filter' | 'search' | 'info';
  payload: string;
  label: string;
}

export interface ConciergeResponse {
  reply: string;
  actions: ConciergeAction[];
}

const MOCK_REPLIES: Record<string, ConciergeResponse> = {
  default: {
    reply: "I'm your FashionOS Concierge. I can help you plan a shoot, manage your inventory, or find talent in our directory. What's on your agenda today?",
    actions: [
      { type: 'navigate', payload: '/shoot-wizard', label: 'Plan a Shoot' },
      { type: 'navigate', payload: '/dashboard/products', label: 'Manage Inventory' }
    ]
  },
  shoot: {
    reply: "It sounds like you're looking to start a new campaign. I've opened the Shoot Wizard for you, where we can define your creative direction.",
    actions: [
      { type: 'navigate', payload: '/shoot-wizard', label: 'Go to Wizard' }
    ]
  },
  talent: {
    reply: "We have a network of verified photographers and stylists. Would you like to browse the directory or let me find matches based on a moodboard?",
    actions: [
      { type: 'navigate', payload: '/directory', label: 'Browse Directory' },
      { type: 'navigate', payload: '/shoot-wizard', label: 'Analyze Moodboard' }
    ]
  }
};

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export const talkToConcierge = async (message: string, context: any = {}): Promise<ConciergeResponse> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!anonKey || anonKey === 'placeholder') {
      const lower = message.toLowerCase();
      if (lower.includes('shoot') || lower.includes('photo')) return MOCK_REPLIES.shoot;
      if (lower.includes('talent') || lower.includes('model')) return MOCK_REPLIES.talent;
      return MOCK_REPLIES.default;
    }

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
    return MOCK_REPLIES.default;
  }
};