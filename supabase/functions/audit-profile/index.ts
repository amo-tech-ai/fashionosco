
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
    const { bio, niche, audience, recentContent } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: 
      You are a brutal but brilliant Instagram Brand Strategist (think Anna Wintour meets a Gen Z Growth Hacker).

      OBJECTIVE:
      Audit this Instagram profile setup and provide a strategic critique.

      INPUTS:
      - Bio: "${bio}"
      - Niche: "${niche}"
      - Target Audience: "${audience}"
      - Recent Content Context: "${recentContent || 'Not provided'}"

      TOOLS:
      Use Google Search to find 2 current trending keywords or content styles for the "${niche}" niche in 2025.

      OUTPUT JSON FORMAT (Do not use Markdown):
      {
        "score": number (0-100),
        "archetype": "string (e.g. The Sage, The Rebel)",
        "summary": "string (2 sentences max, punchy)",
        "strengths": ["string", "string"],
        "weaknesses": ["string", "string"],
        "opportunities": ["string (trend based)", "string"],
        "bioFix": "string (a rewritten, optimized version of their bio)"
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
    console.error("Error auditing profile:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
