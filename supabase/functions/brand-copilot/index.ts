
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
    const { message, history, brandContext } = await req.json();
    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `
      ROLE: You are "FashionOS Copilot", an AI strategist for the brand "${brandContext?.brandName || 'User Brand'}".
      
      CONTEXT:
      - Category: ${brandContext?.category || 'General Fashion'}
      - Price Point: ${brandContext?.pricePositioning || 'Premium'}
      - Vibe: ${brandContext?.vibeDescription || 'Modern'}

      CAPABILITIES:
      - Analyze sales data (simulated).
      - Suggest marketing angles.
      - Draft emails to buyers.
      - Provide inventory advice.

      TONE: Professional, concise, industry-savvy (uses terms like 'Sell-through', 'WSP', 'Linesheet').

      INSTRUCTION:
      Answer the user's message briefly. If they ask for an email or specific output, generate it clearly.
    `;

    // Construct chat history
    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      ...history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    const reply = response.text;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Copilot error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
