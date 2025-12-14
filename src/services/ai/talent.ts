
import { Stakeholder } from '../data/stakeholders';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

// Mock response for fallback
const MOCK_PROFILE: Partial<Stakeholder> = {
  name: "Alex Vorn",
  role: "Photographer",
  location: "Berlin, DE",
  tags: ["High Contrast", "Streetwear", "Film Grain", "Urban"],
  // We don't have bio in Stakeholder interface yet, but the UI might use it or we map it to notes
  // For strict typing with current Stakeholder interface:
  rate: "€1,500/day",
  instagram: "@alexvorn_photo",
  rating: 4.8,
  reviews: 0
};

export const enrichTalentProfile = async (url: string, roleHint?: string): Promise<Partial<Stakeholder> & { bio?: string }> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!anonKey) {
      console.log('✨ Demo Mode: Analyzing talent URL');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_PROFILE), 3000));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/enrich-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ url, roleHint }),
    });

    if (!response.ok) {
      throw new Error('Failed to enrich profile');
    }

    const data = await response.json();
    
    // Map API response to Stakeholder interface
    return {
      name: data.name,
      role: data.role,
      location: data.location,
      tags: data.tags,
      rate: data.rate_estimate,
      instagram: data.instagram_handle,
      bio: data.bio, // Extra field
      rating: 5.0, // Default for new
      reviews: 0,
      img: "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=200&auto=format&fit=crop" // Placeholder
    };

  } catch (error) {
    console.warn('AI Talent Fallback:', error);
    return MOCK_PROFILE;
  }
};
