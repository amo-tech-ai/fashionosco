
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
    const { brandName, category } = await req.json();
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    // Dynamic date to ensure recent trends
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const prompt = `
      ROLE: You are the Chief Strategy Officer for a fashion brand called "${brandName || 'Emerging Label'}" in the "${category || 'Contemporary'}" sector.
      DATE: ${currentDate}
      
      TASK: Generate a "Daily Pulse" briefing based on REAL-TIME market conditions.
      
      STEPS:
      1.  **Search Trends**: Use Google Search to find 1 specific, currently trending topic for ${category} in ${currentDate} (e.g. "Peach Fuzz color trend", "Digital ID regulations").
      2.  **Simulate Notifications**: Create 3 realistic business updates.
      3.  **Strategic Insight**: Provide one actionable piece of advice based on the search result.

      OUTPUT JSON FORMAT (No Markdown):
      {
        "metrics": {
          "sales_trend": "string (e.g. +12%)",
          "retailers_count": number,
          "sell_through": "string (e.g. 68%)"
        },
        "insight": {
          "title": "string (The trend headline)",
          "description": "string (Why it matters now)",
          "action": "string (Button label)"
        },
        "notifications": [
          { 
            "title": "string", 
            "desc": "string", 
            "time": "string", 
            "type": "order" | "alert" | "press" 
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }], // Added Search for real-time trends
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
    console.error("Brand Pulse error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
