
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.5.0";

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Deterministic Scoring Logic
const calculateScores = (signals: any) => {
  let auditScore = 50; // Base score
  let contentHealth = 50;
  let consistency = 50;

  // 1. Visual Quality (Max 20 pts)
  if (signals.visual_quality === 'High') {
    auditScore += 20;
    contentHealth += 20;
  } else if (signals.visual_quality === 'Medium') {
    auditScore += 10;
    contentHealth += 10;
  }

  // 2. Consistency (Max 20 pts)
  if (signals.brand_voice_consistency === 'Strong') {
    auditScore += 20;
    consistency += 40; // Heavy weight
  } else if (signals.brand_voice_consistency === 'Mixed') {
    auditScore += 10;
    consistency += 10;
  }

  // 3. UX/Positioning (Max 10 pts)
  if (signals.website_ux === 'Modern') auditScore += 5;
  if (signals.market_positioning === 'Clear') auditScore += 5;

  // Clamp values 0-100
  return {
    audit_score: Math.min(98, Math.max(10, auditScore)),
    content_health: Math.min(98, Math.max(10, contentHealth)),
    visual_consistency_score: Math.min(98, Math.max(10, consistency))
  };
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

    const prompt = `
      ROLE: You are a World-Class Fashion Brand Strategist and Social Media Data Scientist.
      
      TASK: Perform a "Deep Research" audit on the brand "${brandName}".
      
      INPUTS:
      - Website: ${websiteUrl}
      - Social: ${instagramHandle}
      ${images && images.length > 0 ? '- Visuals: Attached lookbook images provided by the brand.' : ''}

      INSTRUCTIONS:
      1.  **Research**: Google Search for "${brandName} competitors" and "trending marketing strategies for [Brand Category] 2025".
      2.  **Competitor Gap Analysis**: Identify what top competitors are doing on social media that this brand is NOT (e.g., "Competitors are using lo-fi BTS video", "Competitors use TikTok audio trends").
      3.  **Visual Audit**: Compare the website tone (Formal/Casual) vs instagram tone.
      4.  **Extract Signals**: Determine the categorical quality of specific attributes.

      OUTPUT FORMAT (JSON Only - No Markdown):
      {
        "brand_profile": {
          "category": "string",
          "aesthetic_keywords": ["string", "string", "string", "string"],
          "price_positioning": "string (e.g. 'Accessible Luxury')",
          "target_audience": "string",
          "vibe_description": "string",
          "visual_archetype": "string",
          "palette": ["#hex", "#hex", "#hex", "#hex"]
        },
        "signals": {
          "visual_quality": "High" | "Medium" | "Low",
          "brand_voice_consistency": "Strong" | "Mixed" | "Weak",
          "market_positioning": "Clear" | "Vague",
          "website_ux": "Modern" | "Outdated" | "Basic",
          "social_presence": "Active" | "Sparse" | "None"
        },
        "strategic_advice": [
          { 
            "title": "string (Specific Action)", 
            "description": "string (Detailed advice referencing a specific competitor tactic or platform trend. Do NOT be generic. Say 'Post 3x Reels about X' instead of 'Post more video'.)", 
            "impact": "High" | "Medium" | "Low" 
          },
          { 
            "title": "string (Specific Action)", 
            "description": "string", 
            "impact": "High" | "Medium" | "Low" 
          }
        ],
        "competitors": ["string", "string", "string"],
        "market_gap": "string"
      }
    `;

    const contents = [];
    if (images && images.length > 0) {
       images.forEach((img: string) => {
          contents.push({
             inlineData: { mimeType: 'image/jpeg', data: img }
          });
       });
    }
    contents.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        responseMimeType: 'application/json',
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 2048 }
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");

    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const rawData = JSON.parse(text);

    // Calculate Deterministic Scores
    const scores = calculateScores(rawData.signals);

    // Merge Scores into Response
    const finalResult = {
      ...rawData,
      ...scores
    };

    return new Response(JSON.stringify(finalResult), {
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
