
import { MoodBoardAnalysis } from '../../types/ai';
import { compressBase64Image } from '../../utils/fileHelpers';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

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
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!anonKey) {
      console.log('✨ Demo Mode: Analyzing mood board (Mock)');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_ANALYSIS), 2500));
    }

    // 1. Convert to Base64
    const rawBase64s = await Promise.all(files.map(file => convertToBase64(file)));
    
    // 2. Compress images to max 512px width to ensure fast processing and low payload size
    const compressedImages = await Promise.all(
        rawBase64s.map(b64 => compressBase64Image(b64, 512, 0.6))
    );

    // 3. Strip header for API if needed (Supabase function expects raw base64 usually, or handles data uri)
    // The provided Edge Function seems to expect just the data, so we strip headers.
    const cleanImages = compressedImages.map(img => img.split(',')[1]);

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/analyze-mood-board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ images: cleanImages }),
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
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
