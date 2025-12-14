
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
    const { image } = await req.json(); // Base64 image string

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      ROLE: You are a Fashion Merchandising Data Entry Specialist.
      
      TASK: Analyze this image of a fashion line sheet / lookbook. 
      Extract every product visible into a structured JSON list.
      
      FIELDS TO EXTRACT:
      - Name (Product Title)
      - SKU (Style Code)
      - Price (Wholesale/Retail - extract number only)
      - Description (Fabric, Cut, Details)
      - Color/Variant
      - Category (e.g. Dresses, Outerwear)

      OUTPUT JSON FORMAT (Array of Objects):
      [
        {
          "name": "string",
          "sku": "string",
          "price": "string",
          "description": "string",
          "category": "string"
        }
      ]
      
      IMPORTANT:
      - If SKU is missing, generate a placeholder based on the name (e.g. "SILK-DRS-01").
      - Infer category if not explicit.
      - Return ONLY raw JSON. No Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: image } },
          { text: prompt }
        ]
      },
      config: {
        // High reasoning budget to decipher handwriting or complex layouts
        thinkingConfig: { thinkingBudget: 1024 } 
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");

    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const products = JSON.parse(text);

    return new Response(JSON.stringify({ products }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Error parsing line sheet:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
