import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.5.0";

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { shootType, numberOfItems, vibe, referenceBrands, channels, refinement, currentShots, products } = await req.json();
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
      ROLE: Elite Fashion Creative Director and Senior Producer.
      
      CORE TASK: Generate a prioritized, platform-optimized production shot list.
      
      KNOWLEDGE BASE - INSTAGRAM BEST PRACTICES:
      - Brands use diverse image types: product shots, User-Generated Content (UGC), behind-the-scenes (BTS), influencer posts, graphics, and lifestyle images.
      - Trends favor vertical formats (4:5 or 9:16) for feed and Stories.
      - Video types: Reels (Discovery/Hooks), Stories (Authenticity/Behind-the-scenes), In-Feed (Longer tutorials), IG Shopping (Conversion), Carousels (Process).
      - Strategy: Hook quickly (first 3s), provide educational/entertainment value, use trending music/formats, mix formats.

      PRODUCTION LOGIC:
      - 'Hero' shots are for main campaign spots.
      - 'Detail' shots focus on craftsmanship (Macro).
      - 'BTS' humanist the brand.
      - 'UGC-Style' builds trust.
      - If channel includes 'Amazon' or 'Website', prioritize 1:1 clean packshots.
      - If channel includes 'Instagram' or 'TikTok', prioritize 9:16 movement.

      OUTPUT:
      Return a JSON object with a "shots" array.
    `;

    const prompt = `
      PLANNING PARAMETERS:
      - Shoot Type: ${shootType}
      - Item Count: ${numberOfItems}
      - Aesthetic Vibe: ${vibe}
      - Target Channels: ${channels.join(', ')}
      - Style References: ${referenceBrands}
      ${refinement ? `- REFINEMENT FEEDBACK: "${refinement}"` : ''}
      ${products ? `- SPECIFIC ITEMS: ${JSON.stringify(products.map(p => p.name))}` : ''}

      INSTRUCTIONS:
      1. Use Gemini Thinking to balance the ratio of stills vs video based on ${channels.join('/')}.
      2. For Instagram specifically, ensure a mix of Reels, Stories, and Lifestyle images.
      3. For each shot, provide a "channel_logic" explaining why that shot is effective for the chosen platforms.
      4. Assign a Priority (High/Medium/Low) based on marketing ROI.
      5. Ensure at least 60% of assets for social-focused campaigns are vertical (4:5 or 9:16).

      SCHEMA:
      {
        "shots": [
          {
            "id": "string",
            "name": "string",
            "description": "string",
            "angle": "string",
            "lighting": "string",
            "props": "string",
            "format": "9:16" | "4:5" | "1:1" | "16:9",
            "type": "Hero" | "Detail" | "BTS" | "UGC-Style" | "Graphic" | "Video/Reel" | "Story",
            "priority": "High" | "Medium" | "Low",
            "channel_logic": "string"
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    return new Response(response.text, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
