
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.5.0";

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
    const { url, roleHint } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: You are a Talent Scout for a High-Fashion Agency.
      
      TASK: Analyze the creative professional at this URL: "${url}".
      ${roleHint ? `Context: They claim to be a ${roleHint}.` : ''}

      STEPS:
      1.  **Research**: Use Google Search to find their Instagram bio, portfolio website, or LinkedIn.
      2.  **Extract**: Identify their Name, Primary Role (Photographer, Stylist, Model, etc.), and Location (City/Country).
      3.  **Analyze**: Determine their aesthetic "Vibe" (3-5 keywords, e.g., "Noir", "Minimalist", "Film").
      4.  **Synthesize**: Write a professional 2-sentence bio suitable for a directory listing.
      5.  **Rate**: Estimate a standard day rate range based on their experience level (if inferable, otherwise estimate standard market rates for their role).

      OUTPUT JSON FORMAT (No Markdown):
      {
        "name": "string",
        "role": "string",
        "location": "string",
        "tags": ["string", "string", "string"],
        "bio": "string",
        "rate_estimate": "string (e.g. $1,200/day)",
        "instagram_handle": "string (with @)"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");

    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const profile = JSON.parse(text);

    return new Response(JSON.stringify(profile), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Error enriching profile:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
