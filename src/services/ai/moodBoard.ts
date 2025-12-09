
import { MoodBoardAnalysis } from '../../types/ai';

const SUPABASE_FUNCTION_URL = (import.meta as any).env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

// Demo Mock Data
const MOCK_ANALYSIS: MoodBoardAnalysis = {
  colors: ['#E6D5B8', '#2C3E50', '#C0392B', '#FDFEFE', '#566573'],
  keywords: ['Minimalist', 'Organic', 'High-Contrast', 'Sophisticated', 'Architectural'],
  lightingStyle: "Soft, diffused daylight with deep shadows for drama.",
  compositionStyle: "Central framing with negative space dominance.",
  suggestion: "We recommend a 'Natural Light' studio setup with raw material props (stone, wood) to complement the organic tones in your reference.",
  similarBrands: ["The Row", "COS", "Aesop"],
  recommendedProps: ["Travertine blocks", "Dried botanicals", "Linen backdrops"]
};

export const analyzeMoodBoard = async (files: File[]): Promise<MoodBoardAnalysis> => {
  try {
    const anonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

    if (!anonKey) {
      console.log('✨ Demo Mode: Analyzing mood board (Mock)');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_ANALYSIS), 2500));
    }

    // Convert files to base64 for transport
    const images = await Promise.all(files.map(file => convertToBase64(file)));

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/analyze-mood-board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ images }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze mood board');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('AI Vision Fallback:', error);
    return MOCK_ANALYSIS;
  }
};

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            // Remove data:image/jpeg;base64, prefix if present
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        } else {
            reject(new Error("Failed to convert file to base64"));
        }
    };
    reader.onerror = error => reject(error);
  });
};
