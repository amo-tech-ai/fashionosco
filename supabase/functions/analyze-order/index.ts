
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
    const { cart, totalValue } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing API Key');

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: You are a Wholesale Merchandising Expert for a luxury fashion brand.
      
      TASK: Analyze this B2B draft order (cart) and provide strategic advice to the buyer.
      
      CART CONTEXT:
      - Total Value: $${totalValue}
      - Items: ${JSON.stringify(cart.map((c: any) => ({ name: c.name, qty: c.quantity, category: c.category })))}

      RULES & LOGIC:
      1. **Size/Ratio Balance**: Check if the order seems skewed (e.g., buying styles but not enough depth). *Note: Since input is simplified, assume standard size runs if not specified.*
      2. **Upsell Tiers**: Recommend reaching $5,000 for free shipping if close.
      3. **Category Mix**: Suggest complementary categories if missing (e.g., "You have dresses but no outerwear").
      4. **Bestsellers**: Suggest doubling down on key items (pick one random item as a "bestseller").

      OUTPUT JSON FORMAT (No Markdown):
      {
        "score": number (0-100, health of the order),
        "summary": "string (Short encouraging summary)",
        "suggestions": [
          {
            "type": "opportunity" | "warning" | "tip",
            "message": "string",
            "action": "string (e.g. 'Add 2 Units')"
          }
        ],
        "potential_margin": "string (Estimated retail value calculation)"
      }
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
    const json = JSON.parse(text);

    return new Response(JSON.stringify(json), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Order analysis error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
