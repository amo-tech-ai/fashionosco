
export interface Caption {
  archetype: string;
  hook: string;
  body: string;
  hashtags: string;
  reasoning: string;
}

export interface GenerateCaptionParams {
  topic: string;
  tone: string;
  image?: File | null;
  brandName?: string;
  cta?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  topic: string;
  tone: string;
  brandName: string;
  captions: Caption[];
  hasImage: boolean; 
}

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

const MOCK_CAPTIONS: Record<string, Caption[]> = {
  default: [
    {
      archetype: "The Storyteller",
      hook: "Caught in the details. ✨",
      body: "When the light hits just right. Our new silk collection is designed for moments that matter. Shop the look via the link in our bio.",
      hashtags: "#FashionOS #SilkCollection #GoldenHour #LuxuryStyle #OOTD",
      reasoning: "Focuses on sensory details (light, silk) to evoke emotion."
    },
    {
      archetype: "The Trendsetter",
      hook: "Main character energy.",
      body: "POV: You just found your new favorite outfit. Effortless, chic, and ready for anything. Tap to shop before it sells out.",
      hashtags: "#StyleInspo #FashionTrends #ShopTheLook #LimitedEdition #StreetStyle",
      reasoning: "Uses current internet slang (POV, Main Character) to appeal to younger demographics."
    },
    {
      archetype: "The Artisan",
      hook: "Texture talk.",
      body: "Zoom in on the craftsmanship. Every stitch tells a story of quality and dedication. Experience the difference yourself. Link in bio.",
      hashtags: "#LuxuryFashion #DetailsMatter #Craftsmanship #SlowFashion #Textured",
      reasoning: "Highlights quality and macro details to justify premium positioning."
    }
  ]
};

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            // Remove data:image/jpeg;base64, prefix
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        } else {
            reject(new Error("Failed to convert file to base64"));
        }
    };
    reader.onerror = error => reject(error);
  });
};

export const saveToHistory = (
  params: { topic: string; tone: string; brandName: string; hasImage: boolean }, 
  captions: Caption[]
) => {
  try {
    const history = getHistory();
    const newItem: HistoryItem = { 
      id: Date.now().toString(), 
      timestamp: Date.now(),
      topic: params.topic,
      tone: params.tone,
      brandName: params.brandName,
      hasImage: params.hasImage,
      captions 
    };
    // Limit to 20 items to prevent storage issues
    const updatedHistory = [newItem, ...history].slice(0, 20);
    localStorage.setItem('instagram_history', JSON.stringify(updatedHistory));
  } catch (e) {
    console.warn('Failed to save history', e);
  }
};

export const getHistory = (): HistoryItem[] => {
  try {
    return JSON.parse(localStorage.getItem('instagram_history') || '[]');
  } catch {
    return [];
  }
};

export const deleteHistoryItem = (id: string) => {
  try {
    const history = getHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem('instagram_history', JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to delete history item', e);
  }
};

export const clearHistory = () => {
  localStorage.removeItem('instagram_history');
};

export const generateCaptions = async (params: GenerateCaptionParams): Promise<Caption[]> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Fallback to Demo Mode if no backend connection
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock captions');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_CAPTIONS.default), 2000));
    }

    let imageBase64 = null;
    if (params.image) {
      imageBase64 = await convertToBase64(params.image);
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/generate-captions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ 
        topic: params.topic, 
        tone: params.tone,
        brandName: params.brandName,
        cta: params.cta,
        image: imageBase64
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate captions');
    }

    const data = await response.json();
    return data.captions || [];
  } catch (error) {
    console.warn('AI Caption Fallback:', error);
    return MOCK_CAPTIONS.default;
  }
};
