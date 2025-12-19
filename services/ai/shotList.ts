import { Shot, GenerateShotListParams } from '../../types/ai';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export const generateShotList = async (params: GenerateShotListParams): Promise<Shot[]> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // Check if we have a live backend
    if (!anonKey || anonKey === 'placeholder') {
      console.log('✨ Demo Mode: Generating simulated platform-optimized shot list');
      return new Promise(resolve => setTimeout(() => resolve(generateMockShots(params)), 2000));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/generate-shot-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) throw new Error('AI Generation failed');
    const data = await response.json();
    return data.shots || [];
  } catch (error) {
    console.warn('Shot List AI Fallback:', error);
    return generateMockShots(params);
  }
};

const generateMockShots = (params: GenerateShotListParams): Shot[] => {
  const isIG = params.channels.includes('instagram');
  
  return [
    {
      id: 's1',
      name: "Hero Movement Hook",
      description: "Fast-cut model movement emphasizing silhouette against high-contrast background.",
      angle: "Low Angle / Dynamic",
      lighting: "Cinematic Chiaroscuro",
      props: "Smoke Machine",
      format: isIG ? "9:16" : "4:5",
      type: "Video/Reel",
      priority: "High",
      channel_logic: "Stop-scroll visual for Instagram discovery."
    },
    {
      id: 's2',
      name: "Fabric Detail Zoom",
      description: "Slow zoom on stitching and texture. Emphasize quality of materials.",
      angle: "Macro",
      lighting: "Soft Rembrandt",
      props: "Plinth",
      format: "4:5",
      type: "Detail",
      priority: "High",
      channel_logic: "High-save potential on Pinterest/Instagram."
    },
    {
      id: 's3',
      name: "UGC Stylist Selection",
      description: "Handheld shot of the stylist choosing the outfit. Authentic set noise.",
      angle: "POV / Eye Level",
      lighting: "Natural Ambient",
      props: "Wardrobe Rack",
      format: "9:16",
      type: "UGC-Style",
      priority: "Medium",
      channel_logic: "Trust-building content for Instagram Stories."
    }
  ];
};
