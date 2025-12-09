
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
    const { images } = await req.json(); // Array of base64 strings

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    // Limit image inputs to avoid payload limits
    const imageParts = images.slice(0, 4).map((base64Data: string) => ({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Data
      }
    }));

    // Prompt engineering to request JSON structure without using responseSchema
    // (responseSchema is not supported when using tools like googleSearch)
    const prompt = `
      Analyze these moodboard images to extract the aesthetic direction.
      Identify dominant colors (hex codes), style keywords, lighting, and composition.
      
      Use Google Search to identify 3 *real* brands that share this specific aesthetic for the 'similarBrands' field.
      
      Return a VALID JSON object with this exact structure:
      {
        "colors": ["#hex", ...],
        "keywords": ["string", ...],
        "lightingStyle": "string",
        "compositionStyle": "string",
        "suggestion": "string",
        "similarBrands": ["string", ...],
        "recommendedProps": ["string", ...]
      }
      Do not include markdown formatting or backticks. Just the raw JSON string.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [...imageParts, { text: prompt }]
      },
      config: {
        tools: [{ googleSearch: {} }] // Enable Grounding to find real brands
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");

    // Clean up markdown if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const analysis = JSON.parse(text);

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
