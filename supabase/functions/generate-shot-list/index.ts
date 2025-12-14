
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.5.0";

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { shootType, numberOfItems, vibe, referenceBrands, refinement, currentShots, products } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    // Defined Schema for Shot Object using 'Type' from SDK
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        shots: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING, description: "Short, punchy title of the shot (e.g. 'Hero Walking', 'Detail: [Product Name]')" },
              description: { type: Type.STRING, description: "Detailed visual direction including focus and mood" },
              angle: { type: Type.STRING, description: "Specific camera angle (e.g. Low Angle, Overhead, Macro)" },
              lighting: { type: Type.STRING, description: "Lighting setup (e.g. Soft Window, Hard Flash, Chiaroscuro)" },
              props: { type: Type.STRING, description: "Required props or set elements" },
              priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
            },
            required: ["id", "name", "description", "angle", "lighting", "priority"]
          }
        }
      },
      required: ["shots"]
    };

    let prompt = "";

    if (refinement && currentShots) {
        // Refinement Mode Prompt
        prompt = `
          You are a world-class Fashion Creative Director refining a shoot plan.
          
          CURRENT SHOT LIST:
          ${JSON.stringify(currentShots)}

          FEEDBACK / REFINEMENT INSTRUCTION:
          "${refinement}"

          OBJECTIVE:
          Modify the shot list to address the feedback. 
          - You can add, remove, or edit shots.
          - Maintain the vibe: ${vibe}.
          - Ensure the total count remains appropriate for ${numberOfItems} items.
          - Update descriptions and lighting if the feedback implies a style change.
        `;
    } else {
        // Generation Mode Prompt
        let contextProducts = "";
        if (products && products.length > 0) {
            contextProducts = `
            SPECIFIC PRODUCTS TO SHOOT:
            ${products.map((p: any) => `- ${p.name} (Category: ${p.category || 'General'})`).join('\n')}
            
            INSTRUCTION: Create at least one dedicated shot for EACH product listed above. Use the product name in the shot title.
            `;
        }

        prompt = `
          You are a world-class Fashion Creative Director. 
          Generate a shot list for a ${shootType} shoot.
          
          Parameters:
          - Item Count: ${numberOfItems}
          - Vibe/Aesthetic: ${vibe}
          - Brand References: ${referenceBrands}
          
          ${contextProducts}
          
          Instructions:
          1. Create a cohesive visual story.
          2. Mix commercial "safe" shots with high-impact "editorial" angles.
          3. Limit to ${Math.min(numberOfItems + 5, 20)} key shots.
          4. Ensure lighting and props match the requested vibe.
        `;
    }

    // Using Gemini 3 Pro with Thinking Config
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const json = JSON.parse(text);

    return new Response(JSON.stringify(json), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Error generating shot list:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
