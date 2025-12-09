
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.1.1";

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
    const { images } = await req.json(); // Array of base64 strings (no data URI prefix)

    const apiKey = Deno.env.get('GEMINI_API_KEY') || Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    // Limit to first 4 images to respect payload limits
    const imageParts = images.slice(0, 4).map((base64Data: string) => ({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Data
      }
    }));

    const systemInstruction = `
      You are a world-class Art Director. 
      Analyze the provided moodboard images to extract a cohesive aesthetic direction for a fashion/product shoot.
      Output must be valid JSON.
    `;

    const prompt = `
      Analyze these moodboard images. 
      Extract the aesthetic direction.
      
      Return a JSON object with:
      - colors: Array of 5 hex codes representing the dominant color palette.
      - keywords: Array of 5 stylistic keywords (e.g., "Minimalist", "Grunge", "High-Key").
      - lightingStyle: 1 sentence description of the lighting (e.g., "Soft, diffuse daylight with deep shadows").
      - compositionStyle: 1 sentence description of the framing/composition.
      - suggestion: A 1-sentence creative recommendation for the shoot setup.
      - similarBrands: Array of 3 brands with a similar aesthetic.
      - recommendedProps: Array of 3 props that would fit this style.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Multimodal support
      contents: {
        parts: [...imageParts, { text: prompt }]
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const analysis = JSON.parse(jsonStr);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Error analyzing mood board:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
