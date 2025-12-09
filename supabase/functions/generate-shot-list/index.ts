
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.1.1";

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { shootType, numberOfItems, vibe, referenceBrands, turnaround } = await req.json();

    const apiKey = Deno.env.get('GEMINI_API_KEY') || Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
      You are an expert Creative Director and Producer for high-end fashion shoots (Vogue, Harper's Bazaar style).
      Your task is to generate a detailed, prioritized shot list based on the booking details.
      
      Output Format: Pure JSON Array of Shot objects. Do not include markdown code blocks.
      
      Shot Object Structure:
      {
        "id": string (unique),
        "name": string (short title, e.g., "Look 1: Hero Motion"),
        "description": string (detailed creative direction, styling notes, and model pose),
        "angle": string (e.g., "Eye Level", "Low Angle", "Macro", "Overhead", "Dutch Angle"),
        "lighting": string (e.g., "Hard Sunlight", "Soft Window", "Butterfly", "Rembrandt", "Color Gel"),
        "props": string (optional props needed),
        "priority": "High" | "Medium" | "Low"
      }
    `;

    const prompt = `
      Generate a shot list for a ${shootType} shoot.
      Number of Items: ${numberOfItems}
      Vibe/Aesthetic: ${vibe}
      Reference Brands: ${referenceBrands}
      Turnaround Time: ${turnaround}

      Ensure the shots are varied and cover standard e-commerce needs plus creative editorial angles suitable for the ${vibe} aesthetic.
      Limit the list to ${Math.min(numberOfItems + 3, 12)} key shots to keep it focused.
    `;

    // Using Gemini 3 Pro Preview for complex reasoning and structured JSON output
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    // Clean up if model adds markdown blocks despite instructions
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const shots = JSON.parse(jsonStr);

    return new Response(JSON.stringify({ shots }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Error generating shot list:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
