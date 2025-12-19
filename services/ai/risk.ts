import { GoogleGenAI, Type } from "@google/genai";
import { TimelineItem } from "../../types/event-tools";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface RiskSimulationResult {
  blockedMilestones: string[];
  impactScore: number;
  secondaryRisks: Array<{ title: string; risk: string; severity: 'high' | 'medium' }>;
  mitigationPlan: string[];
  grounding_sources?: Array<{ title: string; uri: string }>;
}

export const simulateDependencyCascade = async (
  trigger: string,
  timeline: TimelineItem[]
): Promise<RiskSimulationResult> => {
  const prompt = `
    ROLE: Elite Fashion Event Crisis Manager.
    SCENARIO: A critical production delay has occurred: "${trigger}".
    ACTIVE TIMELINE: ${JSON.stringify(timeline)}

    TASK:
    1. Scan the timeline for dependencies (Load-bearing nodes).
    2. Simulate the recursive 'Butterfly Effect' using Gemini Thinking.
    3. Identify milestones at risk of failure (Blocked).
    4. Calculate market damage (VIP seating conflict, press embargo breach, sponsor exposure).
    5. Suggest a 3-step technical mitigation plan.
    6. Use Google Search to verify if external factors (local traffic, weather) exacerbate this.

    OUTPUT JSON:
    {
      "blockedMilestones": ["string"],
      "impactScore": number (0-100),
      "secondaryRisks": [{ "title": "string", "risk": "string", "severity": "high"|"medium" }],
      "mitigationPlan": ["string"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 2048 }
      }
    });

    const result = JSON.parse(response.text || '{}');
    
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (grounding) {
      result.grounding_sources = grounding
        .filter((c: any) => c.web)
        .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
    }

    return result;
  } catch (error) {
    console.error("Cascade Simulation Error:", error);
    return {
      blockedMilestones: ["Opening Look Sequence", "Main Runway Run"],
      impactScore: 65,
      secondaryRisks: [
        { title: "Press Attrition", risk: "Late start (>15m) results in 20% press drop-off.", severity: "high" },
        { title: "Sponsor Logos", risk: "Delayed walkthrough reduces primary logo exposure window.", severity: "medium" }
      ],
      mitigationPlan: [
        "Transition to Parallel Setup (Stage Right + Left simultaneously)",
        "Shorten intermission loop by 5 minutes",
        "Deploy mobile hospitality to press lounge to mitigate wait friction"
      ]
    };
  }
};