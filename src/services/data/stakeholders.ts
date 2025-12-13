
import { supabase } from '../../lib/supabase';

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  reviews: number;
  img: string;
  tags: string[];
  rate: string;
  instagram?: string;
  website?: string;
}

// Fallback data for Demo Mode / Offline
const MOCK_STAKEHOLDERS: Stakeholder[] = [
  { id: '1', name: 'Elena Rodriguez', role: 'Photographer', location: 'Paris, FR', rating: 5.0, reviews: 24, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop', tags: ['Editorial', 'Film', 'Luxury'], rate: '€1,200/day' },
  { id: '2', name: 'Marcus Chen', role: 'Stylist', location: 'New York, USA', rating: 4.9, reviews: 18, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop', tags: ['Runway', 'Streetwear'], rate: '$900/day' },
  { id: '3', name: 'Sarah Jenkins', role: 'Model', location: 'London, UK', rating: 5.0, reviews: 42, img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop', tags: ['Commercial', 'High Fashion', 'Fitness'], rate: '£600/day' },
  { id: '4', name: 'David Kim', role: 'Videographer', location: 'Seoul, KR', rating: 4.8, reviews: 15, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop', tags: ['Music Video', 'Social', 'Drone'], rate: '₩1.5m/day' },
  { id: '5', name: 'Amara Diop', role: 'Makeup Artist', location: 'Paris, FR', rating: 5.0, reviews: 31, img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2787&auto=format&fit=crop', tags: ['Beauty', 'Editorial', 'SFX'], rate: '€550/day' },
  { id: '6', name: 'Leo Rossi', role: 'Art Director', location: 'Milan, IT', rating: 4.9, reviews: 9, img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2848&auto=format&fit=crop', tags: ['Campaign', 'Branding'], rate: '€1,500/day' },
];

export const StakeholderService = {
  getAll: async (): Promise<Stakeholder[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If we have a real backend connection and session, try fetching
      if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const { data, error } = await supabase
          .from('stakeholders')
          .select('*');

        if (!error && data && data.length > 0) {
          // Map DB schema to Frontend Interface
          return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            role: item.role || 'Creative',
            location: item.location || 'Global', // Assuming location added to schema or jsonb
            rating: item.rating || 5.0, // Mock if missing
            reviews: item.reviews_count || 0,
            img: item.profile_image_url || 'https://via.placeholder.com/150',
            tags: item.specializations || [],
            rate: item.hourly_rate ? `$${item.hourly_rate}/hr` : 'Custom',
            instagram: item.instagram_handle,
            website: item.website_url
          }));
        }
      }
    } catch (e) {
      // Silent fail to mock data
      console.warn("Using mock stakeholder data");
    }
    
    // Return Mock Data if DB is empty or fails
    return MOCK_STAKEHOLDERS;
  }
};
