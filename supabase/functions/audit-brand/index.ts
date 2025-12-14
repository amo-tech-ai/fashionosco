
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
      
      TASK: Perform a "Deep Research" audit on the brand "${brandName}" with a specific focus on Social Media Engagement and Competitor Benchmarking.
      
      INPUTS:
      - Website: ${websiteUrl}
      - Social: ${instagramHandle}
      ${images && images.length > 0 ? '- Visuals: Attached lookbook images provided by the brand.' : ''}

      INSTRUCTIONS:
      1.  **Competitor Reconnaissance**: Use Google Search to identify 3 top competitors for "${brandName}". Analyze their recent high-performing content formats (e.g., Reels vs Carousels, Lo-fi vs Highly Produced).
      2.  **Trend Alignment**: Identify current 2025 platform trends relevant to this brand's category (e.g., "Quiet Luxury aesthetic", "GRWM videos", "Educational styling").
      3.  **Gap Analysis**: Compare the brand's current output (inferred from website/social context) against these competitor wins. What specific content engine is missing?
      4.  **Signal Extraction**: Rate their foundational elements (Visuals, UX, Voice).

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
            "title": "string (Actionable Social Tactic)", 
            "description": "string (Specific instruction based on competitor analysis. Example: 'Competitor X drives 3x engagement using 7-second looping fabric close-ups. Implement this for your silk collection to boost dwell time.')", 
            "impact": "High" | "Medium" | "Low" 
          },
          { 
            "title": "string (Content Format Opportunity)", 
            "description": "string (e.g. 'Shift from static product shots to 'How to Style' carousels to increase Saves by 40%, matching the strategy of [Competitor Name].')", 
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
