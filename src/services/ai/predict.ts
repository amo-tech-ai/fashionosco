
export interface PredictionResult {
  score: number;
  verdict: string;
  visualAnalysis: string;
  trendAlignment: string;
  improvements: string[];
}

export interface PredictionParams {
  image: File;
  caption?: string;
  niche?: string;
}

export interface PredictionHistoryItem {
  id: string;
  timestamp: number;
  caption?: string;
  niche?: string;
  result: PredictionResult;
  // We do NOT save the full image in history to avoid LocalStorage quota limits (5MB)
}

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

const MOCK_PREDICTION: PredictionResult = {
  score: 85,
  verdict: "High Potential",
  visualAnalysis: "Strong use of high-contrast lighting (chiaroscuro) creates immediate visual arrest. The composition follows the rule of thirds effectively.",
  trendAlignment: "The 'Dark Luxury' aesthetic is currently trending up +40% in this niche.",
  improvements: [
    "Brighten the focal point slightly to ensure product clarity on small screens.",
    "Add a vertical crop version (4:5) to maximize screen real estate."
  ]
};

// --- History Management ---

export const savePredictionHistory = (params: { caption?: string, niche?: string }, result: PredictionResult) => {
  try {
    const history = getPredictionHistory();
    const newItem: PredictionHistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      caption: params.caption,
      niche: params.niche,
      result
    };
    // Limit to 20 items
    const updatedHistory = [newItem, ...history].slice(0, 20);
    localStorage.setItem('instagram_predict_history', JSON.stringify(updatedHistory));
  } catch (e) {
    console.warn('Failed to save prediction history', e);
  }
};

export const getPredictionHistory = (): PredictionHistoryItem[] => {
  try {
    return JSON.parse(localStorage.getItem('instagram_predict_history') || '[]');
  } catch {
    return [];
  }
};

export const deletePredictionHistoryItem = (id: string) => {
  try {
    const history = getPredictionHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem('instagram_predict_history', JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to delete prediction history item', e);
  }
};

export const clearPredictionHistory = () => {
  localStorage.removeItem('instagram_predict_history');
};

// --- API Logic ---

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        } else {
            reject(new Error("Failed to convert file to base64"));
        }
    };
    reader.onerror = error => reject(error);
  });
};

export const predictEngagement = async (params: PredictionParams): Promise<PredictionResult> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Fallback to Demo Mode
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock prediction');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_PREDICTION), 3000));
    }

    const imageBase64 = await convertToBase64(params.image);

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/predict-engagement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ 
        image: imageBase64,
        caption: params.caption,
        niche: params.niche
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to predict engagement');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('AI Prediction Fallback:', error);
    return MOCK_PREDICTION;
  }
};
