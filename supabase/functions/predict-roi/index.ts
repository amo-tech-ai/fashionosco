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
    const campaign = await req.json();
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: Elite Fashion Media Strategist & Financial Data Scientist.
      TASK: Perform a forensic ROI audit for the fashion campaign: "${campaign.title}".
      
      CONTEXT:
      - Vibe: ${campaign.vibe}
      - Item Count: ${campaign.numberOfItems}
      - Shot List: ${JSON.stringify(campaign.shotList)}
      
      STEPS:
      1. Use Google Search to find 2-3 direct luxury brand competitors for the "${campaign.vibe}" aesthetic and identify their current social engagement benchmarks.
      2. Analyze the provided Shot List. Evaluate the ratio of video to still, lighting styles, and angles.
      3. Use Gemini Thinking to predict Organic Reach, Engagement Lift, and Conversion Potential.
      
      OUTPUT JSON:
      {
        "overallImpactScore": number (0-100),
        "estimatedReach": { "min": number, "max": number },
        "conversionLift": number (percentage),
        "metrics": [
          { "label": "string", "value": "string", "change": number, "trend": "up"|"down", "description": "string" }
        ],
        "competitorAnalysis": [
          { "brandName": "string", "overlap": number, "advantage": "string", "disadvantage": "string" }
        ],
        "reasoning": "string (Deep strategic rationale based on the thinking phase)"
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