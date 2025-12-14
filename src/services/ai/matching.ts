
import { Stakeholder } from '../data/stakeholders';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export interface MatchResult {
  id: string;
  score: number;
  reason: string;
}

export const searchTalentAI = async (query: string, candidates: Stakeholder[]): Promise<MatchResult[]> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Fallback if no backend
    if (!anonKey) {
      console.log('✨ Demo Mode: Simulating AI matching');
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simple mock filter logic for demo
      const lowerQuery = query.toLowerCase();
      return candidates
        .filter(c => 
            c.role.toLowerCase().includes(lowerQuery) || 
            c.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
            c.location.toLowerCase().includes(lowerQuery)
        )
        .map(c => ({
            id: c.id,
            score: 85 + Math.floor(Math.random() * 15),
            reason: "Matches your criteria based on role and tags."
        }))
        .sort((a, b) => b.score - a.score);
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/match-talent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ query, candidates }),
    });

    if (!response.ok) throw new Error('Failed to match talent');
    
    const data = await response.json();
    return data.matches || [];

  } catch (error) {
    console.warn('AI Matching Fallback:', error);
    return [];
  }
};
