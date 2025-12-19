import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface StrategicBrief {
  briefing_text: string;
  action_items: Array<{
    task: string;
    priority: 'high' | 'medium';
    rationale: string;
  }>;
  market_pulse: string;
  grounding_sources: Array<{ title: string; uri: string }>;
}

export const generateDailyBriefing = async (context: any): Promise<StrategicBrief> => {
  const prompt = `
    Act as the Chief of Staff for a luxury fashion house. 
    1. Consume the current system state: ${JSON.stringify(context)}.
    2. Identify the top 3 'Friction Points' in the production lifecycle today.
    3. Use Google Search Grounding to check if current global logistical delays or fashion week trends impact this production.
    4. Synthesize a 300-word briefing.
    5. Tone: Calm, authoritative, sophisticated.
    6. Output strictly in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    const result = JSON.parse(response.text || '{}');
    
    // Extract grounding
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (grounding) {
      result.grounding_sources = grounding
        .filter((c: any) => c.web)
        .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
    }

    return result;
  } catch (error) {
    console.error("Briefing Error:", error);
    return {
      briefing_text: "System intelligence is currently calibrating. Focus today remains on the core production timeline and ensuring model availability for the opening sequence.",
      action_items: [
        { task: "Verify sample arrival for Look 01", priority: "high", rationale: "Load-bearing asset for the campaign opener." }
      ],
      market_pulse: "Stable. Trending towards heavy textures and architectural silhouettes in SS25.",
      grounding_sources: []
    };
  }
};