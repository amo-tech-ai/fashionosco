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
    const { website, social } = await req.json();
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: You are an Elite Fashion Creative Director and Market Analyst.
      TASK: Perform a deep aesthetic and market audit for a brand using these signals:
      - Website: ${website}
      - Instagram: ${social}

      STEPS:
      1. Use Google Search to find current press mentions, reviews, and verified competitors.
      2. Analyze the "Visual DNA" (Palette, Vibe, Archetype).
      3. Identify strategic "Market Gaps" this brand could fill.

      OUTPUT JSON:
      {
        "brand_profile": {
          "category": "string",
          "aesthetic_keywords": ["string"],
          "price_positioning": "string",
          "target_audience": "string",
          "vibe_description": "string",
          "palette": ["#hex"]
        },
        "audit_score": number (0-100),
        "competitors": ["string"],
        "market_gap": "string"
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

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});