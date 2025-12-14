
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
    const { query, category, pricePoint } = await req.json();
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: You are a Senior Fashion Buyer and Trend Forecaster.
      
      TASK: Conduct a deep market audit for the category: "${category}".
      FOCUS: "${query}"
      CONTEXT: The user's brand is positioned at a ${pricePoint || 'Contemporary'} price point.

      STEPS:
      1.  **Deep Research**: Use Google Search to find current trends for 2025/2026 in this category. Look for emerging colors, fabrics, and silhouettes.
      2.  **Competitor Analysis**: Identify 3 relevant competitors. Find their specific pricing for similar items.
      3.  **Gap Analysis**: Identify where the market is oversaturated vs. where there is opportunity.
      
      OUTPUT JSON FORMAT (No Markdown):
      {
        "trend_summary": "string (Executive summary of the trend)",
        "trending_keywords": ["string", "string", "string"],
        "competitors": [
          { 
            "name": "string", 
            "item_name": "string", 
            "price": "string (e.g. $250)", 
            "notes": "string (e.g. 100% Cotton, Made in Italy)"
          }
        ],
        "pricing_matrix": {
          "market_low": "string",
          "market_average": "string",
          "market_high": "string"
        },
        "opportunities": ["string (Actionable insight 1)", "string (Actionable insight 2)"]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 2048 } // High budget for deep analysis
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");
    
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const json = JSON.parse(text);

    return new Response(JSON.stringify(json), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Audit error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
