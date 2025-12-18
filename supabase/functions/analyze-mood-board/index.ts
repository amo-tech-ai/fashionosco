
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
    const { images } = await req.json(); // Array of base64 strings

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    // Construct vision input parts
    const imageParts = images.slice(0, 4).map((base64Data: string) => ({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Data
      }
    }));

    const prompt = `
      ROLE: You are an Elite Fashion Creative Director and Lighting Technician.
      
      TASK: Conduct a forensic aesthetic analysis of these moodboard images. 
      Identify the core visual DNA to guide a high-end fashion production.

      OBJECTIVES:
      1. **Color Palette**: Extract 5 dominant hex codes that capture the primary and accent tones.
      2. **Keywords**: Identify 5 fashion-industry specific keywords (e.g., Avant-Garde, Quiet Luxury, Gorpcore, Brutalist).
      3. **Lighting Style**: Describe the specific lighting setup (e.g., 'Soft Rembrandt with 2-stop fill', 'Hard Direct Flash with high contrast', 'Diffused North-facing window light').
      4. **Composition**: Define the framing and movement (e.g., 'Dynamic Dutch angle with central weighting').
      5. **Strategic Suggestion**: Provide one actionable piece of advice for the production team.
      6. **Brand Adjacency**: Use Google Search to find 3 real luxury brands that occupy this visual space.

      OUTPUT FORMAT:
      Return a clean JSON object following the provided schema.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [...imageParts, { text: prompt }]
      },
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            colors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5 dominant hex codes"
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5 aesthetic keywords"
            },
            lightingStyle: {
              type: Type.STRING,
              description: "Detailed description of the lighting setup"
            },
            compositionStyle: {
              type: Type.STRING,
              description: "Analysis of framing and subject placement"
            },
            suggestion: {
              type: Type.STRING,
              description: "Strategic production advice"
            },
            similarBrands: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 real brand references"
            },
            recommendedProps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Material/Prop suggestions to match the vibe"
            }
          },
          required: ["colors", "keywords", "lightingStyle", "compositionStyle", "suggestion", "similarBrands"]
        }
      }
    });

    return new Response(response.text, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Vision Analysis Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
