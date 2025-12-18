
import { MoodBoardAnalysis } from '../../types/ai';
import { compressBase64Image } from '../../utils/fileHelpers';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

// Detailed Mock Data for Demo/Development
const MOCK_ANALYSIS: MoodBoardAnalysis = {
  colors: ['#1A1A1A', '#E5D7A4', '#8E8E8E', '#FFFFFF', '#3D3D3D'],
  keywords: ['Editorial', 'Minimalist', 'Noir', 'Architectural', 'High-Glamour'],
  lightingStyle: "Soft Rembrandt lighting with a 2-stop negative fill for deep, cinematic shadows.",
  compositionStyle: "Central subject weighting with significant negative space and low-angle perspective.",
  suggestion: "Consider using a smoke machine or soft-focus filters to accentuate the moody, diffused atmosphere of the reference.",
  similarBrands: ["The Row", "Saint Laurent", "Peter Do"],
  recommendedProps: ["Marble plinths", "Velvet drapery", "Smoked glass"]
};

export const analyzeMoodBoard = async (files: File[]): Promise<MoodBoardAnalysis> => {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  // Fallback to Mock if credentials are missing (Demo Mode)
  if (!anonKey || !supabaseUrl || supabaseUrl.includes('placeholder')) {
    console.log('✨ AI Vision: Offline/Demo Mode');
    return new Promise(resolve => setTimeout(() => resolve(MOCK_ANALYSIS), 2000));
  }

  try {
    // 1. Convert to Base64 and Compress
    // We compress to max 800px to respect Edge Function payload limits while keeping detail
    const imagePromises = files.slice(0, 4).map(async (file) => {
      const base64 = await convertToBase64(file);
      const compressed = await compressBase64Image(base64, 800, 0.7);
      return compressed.split(',')[1]; // Strip data uri prefix
    });

    const cleanImages = await Promise.all(imagePromises);

    // 2. Call Supabase Edge Function
    const response = await fetch(`${SUPABASE_FUNCTION_URL}/analyze-mood-board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ images: cleanImages }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Vision analysis failed');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.warn('AI Vision Fallback Triggered:', error);
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
