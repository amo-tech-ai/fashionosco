
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
    const { brandName, websiteUrl, instagramHandle } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: You are a Senior Fashion Brand Strategist and Data Analyst.

      TASK: Conduct a deep brand audit for "${brandName}".
      
      CONTEXT:
      - Website: ${websiteUrl}
      - Instagram: ${instagramHandle}

      STEPS:
      1.  **Research**: Use Google Search to find reviews, press mentions, and the brand's actual product catalog to understand their market position.
      2.  **Analyze**: Determine their aesthetic vibe, price positioning, and target audience based on available public data.
      3.  **Critique**: Compare their likely digital presence against best-in-class luxury/contemporary standards.
      4.  **Synthesize**: Output a structured report.

      OUTPUT JSON FORMAT (No Markdown):
      {
        "brand_profile": {
          "category": "string",
          "aesthetic_keywords": ["string", "string", "string"],
          "price_positioning": "string (e.g. Luxury, Mass Market)",
          "target_audience": "string",
          "vibe_description": "string"
        },
        "audit_score": number (0-100),
        "content_health": number (0-100),
        "strategic_advice": [
          { "title": "string", "description": "string", "impact": "High" | "Medium" | "Low" }
        ],
        "competitors": ["string", "string", "string"],
        "market_gap": "string"
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

    // Clean Markdown
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let json;
    try {
        json = JSON.parse(text);
    } catch (e) {
        console.error("JSON Parse Error", text);
        throw new Error("AI returned invalid JSON format.");
    }

    return new Response(JSON.stringify(json), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Error auditing brand:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
