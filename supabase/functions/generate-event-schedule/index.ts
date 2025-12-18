
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
    const { eventType, guestCount, startTime, refinement, currentTimeline } = await req.json();
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    let prompt = "";
    if (refinement && currentTimeline) {
      prompt = `
        ROLE: You are an Elite Show Producer.
        TASK: Refine the current "Run of Show" based on this feedback: "${refinement}"
        
        CURRENT TIMELINE:
        ${JSON.stringify(currentTimeline)}
        
        RULES:
        - Maintain the flow logic.
        - Ensure times are sequential and realistic for a ${eventType}.
        - Return the FULL updated list.
      `;
    } else {
      prompt = `
        ROLE: You are an Elite Show Producer for High Fashion Events.
        TASK: Create a detailed "Run of Show" timeline for a ${eventType} with ${guestCount} guests starting at ${startTime}.
        
        REQUIREMENTS:
        - Include Logistics (Load-in, Sound check, Rigging).
        - Include Front of House (Door open, VIP arrival, Seating).
        - Include Show Segments (Opening Look, Main Sequence, Finale, Bow).
        - Include Post-Event (Media interviews, Load-out).
      `;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 1024 },
        responseSchema: {
          type: "OBJECT",
          properties: {
            timeline: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  time: { type: "STRING" },
                  duration: { type: "STRING" },
                  title: { type: "STRING" },
                  description: { type: "STRING" },
                  category: { type: "STRING", enum: ["logistics", "runway", "hospitality", "media"] },
                  status: { type: "STRING", enum: ["pending", "confirmed"] }
                },
                required: ["time", "duration", "title", "description", "category", "status"]
              }
            }
          },
          required: ["timeline"]
        }
      }
    });

    return new Response(response.text, {
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
