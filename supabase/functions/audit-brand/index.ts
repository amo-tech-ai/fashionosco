
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
      ROLE: You are a World-Class Fashion Brand Strategist and Data Scientist.
      
      TASK: Perform a "Deep Research" audit on the brand "${brandName}".
      
      INPUTS:
      - Website: ${websiteUrl} (Use Google Search to find and read key pages like About, Shop, Journal)
      - Social: ${instagramHandle} (Use Google Search to find recent sentiment/posts)

      INSTRUCTIONS:
      1.  **Verify & Contextualize**: Search for the brand to confirm its existence and primary product categories.
      2.  **Reputation Check**: Look for reviews, press mentions, or "best of" list inclusions to gauge market standing.
      3.  **Visual Analysis (Inferred)**: Based on the text descriptions found on their site/socials, infer their visual aesthetic (e.g., "Minimalist", "Maximalist", "Grunge").
      4.  **Strategic Synthesis**: Determine their likely price positioning and target audience demographics.

      OUTPUT FORMAT:
      Return ONLY a valid JSON object. Do NOT include markdown code blocks (like \`\`\`json).
      
      JSON STRUCTURE:
      {
        "brand_profile": {
          "category": "Specific Category (e.g. Sustainable Knitwear)",
          "aesthetic_keywords": ["Keyword1", "Keyword2", "Keyword3", "Keyword4"],
          "price_positioning": "Tier (e.g. Accessible Luxury, Mass Market, High-End)",
          "target_audience": "Specific Persona (e.g. Gen Z Urban Creatives)",
          "vibe_description": "A 2-sentence summary of the brand's mood and ethos."
        },
        "audit_score": number (0-100, based on clarity of proposition),
        "content_health": number (0-100, estimated based on consistency),
        "strategic_advice": [
          { "title": "Punchy Headline", "description": "Actionable insight based on market gaps.", "impact": "High" | "Medium" }
        ],
        "competitors": ["Competitor 1", "Competitor 2", "Competitor 3"],
        "market_gap": "A specific opportunity they are missing."
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 2048 } // Allocated budget for deep reasoning
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");

    // Clean Markdown if model ignores instruction
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
