
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.1.1";

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { shootType, numberOfItems, vibe, referenceBrands } = await req.json();

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
              name: { type: Type.STRING, description: "Short title of the shot" },
              description: { type: Type.STRING, description: "Detailed creative direction" },
              angle: { type: Type.STRING, description: "Camera angle (e.g., Low Angle, Macro)" },
              lighting: { type: Type.STRING, description: "Lighting setup (e.g., Soft Window, Hard Flash)" },
              props: { type: Type.STRING, description: "Required props or set elements" },
              priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
            },
            required: ["id", "name", "description", "angle", "lighting", "priority"]
          }
        }
      }
    };

    const prompt = `
      You are an expert Creative Director. Generate a shot list for a ${shootType} shoot.
      
      Parameters:
      - Items: ${numberOfItems}
      - Vibe: ${vibe}
      - References: ${referenceBrands}
      
      Create a cohesive story. Mix "Safe" commercial shots with "Editorial" creative angles.
      Limit to ${Math.min(numberOfItems + 3, 10)} key shots.
    `;

    // Using Gemini 3 Pro Preview with Thinking Config and Structured Output
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 1024 } // Enable thinking for better creative planning
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
