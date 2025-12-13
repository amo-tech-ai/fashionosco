
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
    const { topic, tone, image, brandName, cta } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    // "Super Prompt" Structure
    let promptText = `
      ROLE: 
      You are the Global Editor-in-Chief for Vogue Digital and a Data Scientist specializing in Instagram algorithms.

      OBJECTIVE: 
      Generate 3 distinct high-conversion Instagram caption options based on visual analysis and strategic intent.

      INPUTS:
      - Context/Topic: ${topic}
      - Brand Tone: ${tone}
      - Brand Name: ${brandName || 'a premium fashion brand'}
      - Call to Action: ${cta || 'Link in bio'}

      TOOLS & INSTRUCTIONS:
      1. **Vision**: If an image is provided, analyze the fabric, fit, lighting moods (e.g., "chiaroscuro"), and color palettes.
      2. **Trends**: Use Google Search to verify current trending aesthetic keywords (e.g., "Quiet Luxury", "Mob Wife", "Cottagecore") relevant to this image/topic for 2025.
      3. **Structure**: Return a RAW JSON object. Do not use Markdown formatting.

      OUTPUT JSON FORMAT:
      {
        "captions": [
          {
            "archetype": "Name of the vibe (e.g. The Storyteller, The Minimalist)",
            "hook": "Stop scroll hook here (max 5 words)",
            "body": "Immersive caption connecting visual details to emotion. Include emojis.",
            "hashtags": "#Specific #Niche #Tags (Based on real trends)",
            "reasoning": "Brief strategic explanation of why this hook/style works for this specific image."
          }
        ]
      }
    `;

    const contents = [];
    
    if (image) {
      contents.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: image // Base64 string
        }
      });
      promptText += "\n\n[SYSTEM]: Refer directly to the visual elements in the attached image for the 'reasoning' field.";
    }

    contents.push({ text: promptText });

    // Using gemini-3-pro-preview with Google Search Tools
    // Note: responseSchema is NOT used here because it conflicts with Tools in the current API version.
    // We rely on the prompt to enforce JSON structure.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 1024 } // Enable thinking for better reasoning
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");

    // Clean Markdown code blocks if present (Common when not using responseSchema)
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // Parse JSON
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
    console.error("Error generating captions:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
