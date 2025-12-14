
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
    const { eventType, guestCount, startTime } = await req.json();
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: You are a Show Producer for Paris Fashion Week.
      
      TASK: Create a detailed "Run of Show" timeline for a ${eventType} with ${guestCount} guests starting at ${startTime}.
      
      REQUIREMENTS:
      - Include logistics (Load-in, Sound check).
      - Include Front of House (Door open, Seating).
      - Include the Show/Event flow (Music cue, Finale).
      - Include Post-event (Load-out).
      
      OUTPUT JSON FORMAT (Array):
      [
        {
          "time": "HH:MM",
          "duration": "string (e.g. 15m)",
          "title": "string",
          "description": "string",
          "category": "logistics" | "runway" | "hospitality" | "media",
          "status": "pending"
        }
      ]
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
    const timeline = JSON.parse(text);

    return new Response(JSON.stringify({ timeline }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Schedule gen error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
