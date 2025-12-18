
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@0.5.0";

// Declare Deno for TypeScript compiler in Supabase Edge Functions environment
declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { eventTitle, location, vibe, audience } = await req.json();
    
    // Fix: Access Deno environment variables for API_KEY
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: You are a Luxury Brand Partnership Agent.
      TASK: Find 4 real-world brands that would be ideal sponsors for: "${eventTitle}".
      CONTEXT:
      - Location: ${location}
      - Aesthetic Vibe: ${vibe}
      - Target Audience: ${audience}

      STEPS:
      1. Use Google Search to find real brands (Spirits, Tech, Fragrance, Automotive) currently sponsoring luxury events in ${location}.
      2. Identify brands that match the "${vibe}" aesthetic.
      3. Calculate a 'Fit Score' based on audience alignment.

      OUTPUT JSON:
      {
        "marketContext": "Summary of current luxury sponsorship trends in ${location}",
        "matches": [
          {
            "id": "string",
            "brandName": "string",
            "category": "string",
            "fitScore": number (0-100),
            "rationale": "Strategic reason for pairing",
            "suggestedTier": "Title" | "Gold" | "In-Kind",
            "outreachAngle": "The unique hook for the pitch"
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    return new Response(response.text, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
