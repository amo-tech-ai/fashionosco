
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
    const { bio, niche, audience, recentContent, instagramHandle, websiteUrl } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: 
      You are a specialized Instagram Growth Strategist & Brand Analyst.

      OBJECTIVE:
      Provide a brutal, specific critique of this profile's conversion potential and engagement strategy. 
      You MUST benchmark against competitors and current platform trends.

      INPUTS:
      - Bio: "${bio || 'Not provided'}"
      - Niche: "${niche}"
      - Target Audience: "${audience}"
      - Handle: "${instagramHandle || 'Not provided'}"
      - Website: "${websiteUrl || 'Not provided'}"
      - Recent Content Context: "${recentContent || 'Not provided'}"

      TOOLS & INSTRUCTIONS:
      1. **Competitor Recon**: Use Google Search to identify 2 top-performing competitors in the "${niche}" niche. Analyze what they are doing differently/better.
      2. **Trend Check**: Identify 1-2 specific, currently trending content formats (e.g. "Silent Review", "Texture Zoom", specific audio trends) relevant to this niche in 2025.
      3. **Strategic Critique**: Analyze the alignment between the provided Bio/Website and the target audience.

      OUTPUT JSON FORMAT (Do not use Markdown):
      {
        "score": number (0-100),
        "archetype": "string (e.g. The Curator, The Educator)",
        "summary": "string (2 sentences max, punchy)",
        "strengths": ["string", "string"],
        "weaknesses": ["string", "string"],
        "opportunities": ["string (Must be a specific content format or hook to try, e.g. 'Try 7-second looping Reels')", "string"],
        "bioFix": "string (a rewritten, optimized version of their bio using keywords)",
        "competitorInsight": "string (Specific observation about a competitor's strategy to copy/avoid)"
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
