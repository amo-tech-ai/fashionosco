
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
    const { query, candidates } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    // Reranking Prompt
    const prompt = `
      ROLE: You are an Expert Creative Talent Scout.
      
      TASK: Rank the provided candidates based on how well they match the User Query.
      
      USER QUERY: "${query}"
      
      CANDIDATES:
      ${JSON.stringify(candidates.map((c: any) => ({
        id: c.id,
        role: c.role,
        tags: c.tags,
        location: c.location,
        bio: c.bio || 'No bio'
      })))}

      CRITERIA:
      1. Role Match: Does the candidate's role align with the request? (Critical)
      2. Aesthetic Match: Do the tags/bio match the "vibe" described?
      3. Location Match: If a location is specified, prioritize it.

      OUTPUT JSON FORMAT:
      {
        "matches": [
          {
            "id": "string",
            "score": number (0-100),
            "reason": "string (Why this is a good match, e.g. 'Strong aesthetic alignment with [keyword]')"
          }
        ]
      }
      
      Return only candidates with a score > 40. Sort by score descending.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");
    
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(text);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Matching error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
