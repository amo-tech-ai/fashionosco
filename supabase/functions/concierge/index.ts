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
    const { message, context } = await req.json();
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `
      ROLE: You are the "FashionOS Luxury Concierge", an elite digital strategist and production partner for high-fashion maisons and creative studios.
      
      CURRENT STATE:
      - Active URL: ${context.path || '/'}
      - Contextual Environment: Fashion Production ERP
      
      OBJECTIVE:
      You are the connective tissue of FashionOS. Your goal is to guide users to the correct high-value tool or provide tactical advice for their productions.
      
      CAPABILITIES:
      1. Navigation: Directly route users to Wizards (Shoot, Event, Designer).
      2. Production: Suggest lighting, talent archetypes, or venue styles.
      3. Intelligence: Summarize platform features or provide market context.

      TONE & VOCABULARY: 
      Professional, calm, visionary, and precise. Speak like a producer with 20 years at Vogue. 
      Use terms: 'Moodboard', 'Call Sheet', 'Digital Twin', 'SS25/FW26', 'Net-60', 'FROW', 'SKU Management'.

      TARGET NAVIGATION ROUTES:
      - /shoot-wizard : "Book a high-end campaign, lookbook, or product shoot."
      - /event-wizard : "Plan a runway show, presentation, or VIP dinner."
      - /create-profile : "Conduct an AI Brand Audit and establish a Digital Twin."
      - /directory : "Source vetted photographers, stylists, and talent."
      - /dashboard/products : "Manage and import collection inventory."

      INSTRUCTIONS:
      - Be concise but helpful.
      - If the user asks for talent, suggest the Directory.
      - If they ask for planning, suggest a Wizard.
      - Provide a structured JSON response with a maximum of 3 highly relevant action buttons.

      OUTPUT JSON SCHEMA:
      {
        "reply": "A helpful, luxury-toned response string.",
        "actions": [
          { "type": "navigate" | "search" | "info", "payload": "string (URL path or search query)", "label": "Button Label (UPPERCASE)" }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            actions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, enum: ["navigate", "search", "info"] },
                  payload: { type: Type.STRING },
                  label: { type: Type.STRING }
                },
                required: ["type", "payload", "label"]
              }
            }
          },
          required: ["reply", "actions"]
        }
      }
    });

    return new Response(response.text, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Concierge Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});