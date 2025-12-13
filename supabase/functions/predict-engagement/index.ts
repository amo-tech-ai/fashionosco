
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
    const { image, caption, niche } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    // Limit inputs if necessary
    const targetNiche = niche || "General Fashion";

    const prompt = `
      ROLE:
      You are an expert Instagram Algorithm Analyst and Visual Trend Forecaster.

      OBJECTIVE:
      Analyze this image (and optional caption) to predict its performance potential on Instagram for the "${targetNiche}" niche in 2025.

      INPUTS:
      - Caption Context: "${caption || 'No caption provided'}"
      - Niche: "${targetNiche}"

      TOOLS:
      Use Google Search to verify if the visual style (lighting, colors, subject) matches current trending aesthetics for this niche.

      OUTPUT JSON FORMAT (No Markdown):
      {
        "score": number (0-100),
        "verdict": "string (e.g. Viral Potential, Solid Performer, Needs Work)",
        "visualAnalysis": "string (Critique of lighting/composition)",
        "trendAlignment": "string (How it fits current meta)",
        "improvements": ["string (actionable fix 1)", "string (actionable fix 2)"]
      }
    `;

    const contents = [
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: image
        }
      },
      { text: prompt }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");

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
    console.error("Error predicting engagement:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
