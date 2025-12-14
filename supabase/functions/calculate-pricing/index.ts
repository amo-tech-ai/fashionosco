
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
    const { costs, targetMargin, category } = await req.json();
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: You are a Fashion Production Manager and Financial Analyst.
      
      TASK: Calculate the optimal Wholesale and Retail (RRP) pricing strategy.
      
      INPUT DATA:
      - Category: ${category}
      - Costs: ${JSON.stringify(costs)} (Fabric, Cut & Make, Trims, Logistics, Duty)
      - Target Gross Margin: ${targetMargin}% (Retail Margin)
      
      INSTRUCTIONS:
      1.  Calculate **Landed Cost (COGS)**: Sum of all input costs.
      2.  Calculate **Wholesale Price (WSP)**: Typically COGS x 2.2 to 2.5 (Standard markup).
      3.  Calculate **Recommended Retail Price (RRP)**: Typically WSP x 2.2 to 2.5.
      4.  **Sanity Check**: Does the resulting RRP meet the ${targetMargin}% margin goal? (Margin = (RRP - COGS) / RRP).
      5.  **Market Adjustment**: If the RRP seems weird (e.g. $143.21), round it to standard psychological pricing (e.g. $145.00 or $139.00).
      
      OUTPUT JSON FORMAT (No Markdown):
      {
        "cogs": number,
        "wholesale_price": number,
        "rrp": number,
        "achieved_margin": string (percentage),
        "breakdown": [
          { "label": "string", "value": number, "note": "string" }
        ],
        "strategy_note": "string (Explanation of the pricing logic and rounding)"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 1024 }
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
    console.error("Pricing error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
