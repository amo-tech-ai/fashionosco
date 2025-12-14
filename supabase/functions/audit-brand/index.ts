
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenAI } from "https://esm.sh/@google/genai@0.5.0";

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- SCORING ENGINE ---
const calculateDeterministicScores = (signals: any) => {
  let auditScore = 50; 
  let contentHealth = 50;
  let consistency = 50;

  // Visual Quality Weight (20%)
  if (signals.visual_quality === 'High') {
    auditScore += 20;
    contentHealth += 20;
  } else if (signals.visual_quality === 'Medium') {
    auditScore += 10;
    contentHealth += 10;
  }

  // Brand Voice & Consistency Weight (40%)
  if (signals.brand_voice_consistency === 'Strong') {
    auditScore += 20;
    consistency += 40;
  } else if (signals.brand_voice_consistency === 'Mixed') {
    auditScore += 10;
    consistency += 10;
  }

  // Positioning & UX Weight (10%)
  if (signals.website_ux === 'Modern') auditScore += 5;
  if (signals.market_positioning === 'Clear') auditScore += 5;

  return {
    audit_score: Math.min(98, Math.max(15, auditScore)),
    content_health: Math.min(98, Math.max(15, contentHealth)),
    visual_consistency_score: Math.min(98, Math.max(15, consistency))
  };
};

// --- PROMPT ENGINEERING ---
const generateAnalysisPrompt = (brandName: string, websiteUrl: string, instagramHandle: string, hasImages: boolean) => {
  return `
    ROLE: You are a World-Class Fashion Brand Strategist & Data Scientist.
    
    TASK: Perform a "Deep Research" audit on the brand "${brandName}".
    
    CONTEXT:
    - Website: ${websiteUrl}
    - Social: ${instagramHandle}
    ${hasImages ? '- Visuals: Attached images from brand lookbook.' : ''}

    RESEARCH STRATEGY (Use Google Search Tool):
    1. **Identity Check**: Search "site:${websiteUrl || brandName} about" to extract their self-defined mission.
    2. **Reputation Check**: Search "${brandName} fashion reviews" or "${brandName} competitors" to see market perception.
    3. **Trend Check**: Search for "Fashion trends 2025" relevant to the keywords found in step 1.

    ANALYSIS OBJECTIVES:
    1. **Gap Analysis**: Compare the brand's inferred output against top-tier competitors. What content engine is missing?
    2. **Visual DNA**: Define their aesthetic using precise fashion terminology (e.g., "Y2K", "Old Money", "Avant-Garde").
    3. **Signal Extraction**: Rate foundational elements (Visuals, UX, Voice) for the scoring engine.

    OUTPUT JSON FORMAT (Strictly enforce this structure):
    {
      "brand_profile": {
        "category": "string (e.g. 'Contemporary Womenswear')",
        "aesthetic_keywords": ["string", "string", "string", "string"],
        "price_positioning": "string (e.g. 'Accessible Luxury')",
        "target_audience": "string",
        "vibe_description": "string (2 sentences capturing the soul of the brand)",
        "visual_archetype": "string (e.g. 'The Modern Minimalist')",
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
          "title": "string (Actionable Tactic)", 
          "description": "string (Specific instruction. E.g. 'Competitor X uses 7s loops. Do this.')", 
          "impact": "High" | "Medium" | "Low" 
        },
        { 
          "title": "string (Content Opportunity)", 
          "description": "string", 
          "impact": "High" | "Medium" | "Low" 
        }
      ],
      "competitors": ["string", "string", "string"],
      "market_gap": "string (A niche they can own)"
    }
  `;
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { brandName, websiteUrl, instagramHandle, images } = await req.json();

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) throw new Error('Missing Gemini API Key');

    const ai = new GoogleGenAI({ apiKey });

    // Construct Multimodal Request
    const contents = [];
    if (images && Array.isArray(images)) {
       images.forEach((img: string) => {
          contents.push({
             inlineData: { mimeType: 'image/jpeg', data: img }
          });
       });
    }
    
    const promptText = generateAnalysisPrompt(brandName, websiteUrl, instagramHandle, !!(images && images.length));
    contents.push({ text: promptText });

    // Call Gemini 3 Pro with Thinking & Tools
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        responseMimeType: 'application/json',
        tools: [{ googleSearch: {} }], 
        thinkingConfig: { thinkingBudget: 2048 } // High budget for deep reasoning
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response generated by AI");

    // Parse & Post-Process
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const rawData = JSON.parse(cleanJson);
    const scores = calculateDeterministicScores(rawData.signals);

    const finalResult = {
      ...rawData,
      ...scores
    };

    return new Response(JSON.stringify(finalResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Audit Brand Error:", error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
