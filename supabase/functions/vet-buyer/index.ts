
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
    const { storeName, website, instagram, location } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: You are a Wholesale Risk Analyst for a Luxury Fashion Brand.
      
      TASK: Vetting a retailer application for "${storeName}".
      
      INPUTS:
      - Website: ${website}
      - Instagram: ${instagram}
      - Location: ${location}

      STEPS:
      1. **Verification**: Use Google Search to verify if "${storeName}" exists at "${location}". Look for reviews or map listings.
      2. **Brand Audit**: Analyze the brands they currently stock (via website context).
      3. **Aesthetic Fit**: Determine if they fit a "Contemporary Luxury" vibe or "Fast Fashion" vibe.
      4. **Risk Assessment**: Assign a risk score (0-100, where 0 is safe). High risk if no online presence or bad reviews.

      OUTPUT JSON FORMAT (No Markdown):
      {
        "risk_score": number,
        "aesthetic_tier": "Luxury" | "Contemporary" | "Mass Market" | "Discount",
        "is_physical_store_verified": boolean,
        "brands_stocked": ["string", "string", "string"],
        "verdict": "Approve" | "Manual Review" | "Reject",
        "reasoning": "string"
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
    const json = JSON.parse(text);

    return new Response(JSON.stringify(json), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Vetting error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
