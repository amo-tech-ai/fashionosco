
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
    const { brandName, websiteUrl, instagramHandle, images } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    const ai = new GoogleGenAI({ apiKey });

    // Construct a prompt that enforces the exact JSON structure required by BrandAuditResult
    const prompt = `
      ROLE: You are a World-Class Fashion Brand Strategist and Data Scientist.
      
      TASK: Perform a "Deep Research" audit on the brand "${brandName}".
      
      INPUTS:
      - Website: ${websiteUrl}
      - Social: ${instagramHandle}
      ${images && images.length > 0 ? '- Visuals: Attached lookbook images provided by the brand.' : ''}

      INSTRUCTIONS:
      1.  **Verify & Contextualize**: Use Google Search to find the brand's official presence, press reviews, and primary product categories.
      2.  **Reputation Check**: Look for recent news or "best of" list inclusions to gauge market standing.
      3.  **Visual Analysis**: 
          - Analyze the provided images (if any) or infer aesthetic from search results.
          - Determine color palette, lighting style, and "Visual Archetype".
      4.  **Strategic Synthesis**: 
          - Estimate "Visual Consistency" (Do the text claims match the visual reality?).
          - Identify a specific "Market Gap" they are ignoring.

      OUTPUT FORMAT:
      Return ONLY a valid JSON object matching this schema exactly.
      
      {
        "brand_profile": {
          "category": "string",
          "aesthetic_keywords": ["string", "string", "string", "string"],
          "price_positioning": "string (e.g. 'Accessible Luxury', 'High-End', 'Mass Market')",
          "target_audience": "string",
          "vibe_description": "string",
          "visual_archetype": "string (e.g. 'The Modern Minimalist')",
          "palette": ["#hex", "#hex", "#hex", "#hex"]
        },
        "audit_score": number (0-100),
        "content_health": number (0-100),
        "visual_consistency_score": number (0-100),
        "strategic_advice": [
          { 
            "title": "string", 
            "description": "string", 
            "impact": "High" | "Medium" | "Low" 
          },
          { 
            "title": "string", 
            "description": "string", 
            "impact": "High" | "Medium" | "Low" 
          },
          { 
            "title": "string", 
            "description": "string", 
            "impact": "High" | "Medium" | "Low" 
          }
        ],
        "competitors": ["string", "string", "string"],
        "market_gap": "string"
      }
    `;

    const contents = [];
    
    // Add images if present
    if (images && images.length > 0) {
       images.forEach((img: string) => {
          contents.push({
             inlineData: {
                mimeType: 'image/jpeg',
                data: img
             }
          });
       });
    }
    
    contents.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        responseMimeType: 'application/json', // Force JSON structure
        tools: [{ googleSearch: {} }], // Enable Deep Research
        thinkingConfig: { thinkingBudget: 2048 } // Enable Reasoning for complex audit
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");

    // Clean Markdown if present (just in case model wraps JSON despite config)
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

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
    console.error("Error auditing brand:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
