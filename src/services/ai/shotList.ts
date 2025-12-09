
import { Shot, GenerateShotListParams } from '../../types/ai';

const SUPABASE_FUNCTION_URL = (import.meta as any).env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

// Dynamic Mock Data Generator for Demo Mode
const generateMockShots = (params: GenerateShotListParams): Shot[] => {
  const count = Math.min(params.numberOfItems, 8); // Generate up to 8 preview shots
  const vibe = params.vibe || 'editorial';
  const type = params.shootType || 'campaign';
  
  const templates = [
    {
      name: "Hero Shot",
      desc: (v: string) => `Full body capture with ${v} movement. Emphasize silhouette and fabric drape.`,
      angle: "Low Angle / Wide",
      priority: 'High'
    },
    {
      name: "Detail Focus",
      desc: (v: string) => `Macro shot of hardware/texture elements. ${v} lighting to highlight material quality.`,
      angle: "Macro / 45-degree",
      priority: 'Medium'
    },
    {
      name: "Lifestyle Context",
      desc: (v: string) => `Product in use/motion. Background blurred to maintain focus on subject. ${v} energy.`,
      angle: "Eye Level",
      priority: 'High'
    },
    {
      name: "Creative Flatlay",
      desc: (v: string) => `Top-down arrangement with prop styling. Geometric composition fitting a ${v} aesthetic.`,
      angle: "Overhead",
      priority: 'Medium'
    },
    {
      name: "Profile Silhouette",
      desc: (v: string) => `Side profile contrasting against background. Dramatic shadows for ${v} mood.`,
      angle: "Profile",
      priority: 'Low'
    }
  ];

  return Array.from({ length: count }).map((_, i) => {
    const template = templates[i % templates.length];
    return {
      id: `shot-${Date.now()}-${i}`,
      name: `Look ${i + 1}: ${template.name}`,
      description: template.desc(vibe),
      angle: template.angle,
      lighting: vibe === 'dark' ? "Chiaroscuro / Hard Light" : "Soft Window / Diffused",
      props: i % 2 === 0 ? "Minimalist plinth" : "Natural elements",
      priority: template.priority as 'High' | 'Medium' | 'Low'
    };
  });
};

export const generateShotList = async (params: GenerateShotListParams): Promise<Shot[]> => {
  try {
    // Check if we are in a live environment with API configured
    // For this preview environment, we default to mock if no key is present
    const hasKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;
    
    if (!hasKey) {
      console.log('✨ Demo Mode: Generating intelligent mock shot list');
      // Simulate network delay
      return new Promise(resolve => setTimeout(() => resolve(generateMockShots(params)), 1500));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/generate-shot-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(import.meta as any).env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to generate shot list');
    }

    const data = await response.json();
    return data.shots;
  } catch (error) {
    console.warn('AI Service Fallback:', error);
    // Graceful fallback to mock data ensures UI never breaks
    return generateMockShots(params);
  }
};
