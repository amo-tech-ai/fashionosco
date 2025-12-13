
import { Shot, GenerateShotListParams } from '../../types/ai';

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

// Dynamic Mock Data Generator for Demo Mode
const generateMockShots = (params: GenerateShotListParams): Shot[] => {
  const vibe = params.vibe || 'editorial';

  // If refinement & current shots exist, append a new shot instead of regenerating
  if (params.currentShots && params.refinement) {
     const newShot: Shot = {
        id: `shot-${Date.now()}`,
        name: `AI Suggestion: ${params.refinement.length > 20 ? params.refinement.substring(0, 20) + '...' : params.refinement}`,
        description: `AI generated shot based on request: "${params.refinement}". Styled to match ${vibe} aesthetic with dynamic lighting.`,
        angle: params.refinement.toLowerCase().includes('close') ? "Macro Detail" : "Creative Angle",
        lighting: vibe.includes('dark') ? "Chiaroscuro" : "Natural Soft",
        props: "Contextual props",
        priority: "Medium"
     };
     return [...params.currentShots, newShot];
  }
  
  const count = Math.min(params.numberOfItems, 8); // Generate up to 8 preview shots
  
  // Basic templates
  let templates = [
    {
      name: "Hero Shot",
      desc: (v: string) => `Full body capture with ${v} movement. Emphasize silhouette and fabric drape.`,
      angle: "Low Angle / Wide",
      priority: 'High'
    },
    {
      name: "Detail Focus",
      desc: (v: string) => `Macro shot of hardware/texture. ${v} lighting to highlight quality.`,
      angle: "Macro / 45-degree",
      priority: 'Medium'
    },
    {
      name: "Lifestyle Context",
      desc: (v: string) => `Product in use. Background blurred. ${v} energy with dynamic posing.`,
      angle: "Eye Level",
      priority: 'High'
    },
    {
      name: "Creative Flatlay",
      desc: (v: string) => `Top-down arrangement. Geometric composition fitting a ${v} aesthetic.`,
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

  // Mock Refinement Logic (for fresh generation)
  if (params.refinement) {
    const r = params.refinement.toLowerCase();
    if (r.includes('macro') || r.includes('detail') || r.includes('close')) {
       templates = templates.filter(t => t.name.includes('Detail') || t.name.includes('Flatlay'));
       templates.push({
          name: "Super Macro Texture",
          desc: (v: string) => `Extreme close up of fabric weave. ${v} mood.`,
          angle: "Macro",
          priority: 'High'
       });
    } else if (r.includes('wide') || r.includes('hero')) {
       templates = templates.filter(t => t.name.includes('Hero') || t.name.includes('Profile'));
    }
  }

  return Array.from({ length: count }).map((_, i) => {
    const template = templates[i % templates.length];
    return {
      id: `shot-${Date.now()}-${i}`,
      name: `Look ${i + 1}: ${template.name}`,
      description: template.desc(vibe),
      angle: template.angle,
      lighting: vibe.includes('dark') ? "Chiaroscuro" : "Soft Diffused",
      props: i % 2 === 0 ? "Minimalist plinth" : "Natural elements",
      priority: template.priority as 'High' | 'Medium' | 'Low'
    };
  });
};

export const generateShotList = async (params: GenerateShotListParams): Promise<Shot[]> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // Fallback to Demo Mode if no backend connection
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating intelligent mock shot list');
      return new Promise(resolve => setTimeout(() => resolve(generateMockShots(params)), 1500));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/generate-shot-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to generate shot list');
    }

    const data = await response.json();
    return data.shots || [];
  } catch (error) {
    console.warn('AI Service Fallback:', error);
    return generateMockShots(params);
  }
};
