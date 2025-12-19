import { GoogleGenAI, Type } from "@google/genai";

export interface ProductionMitigation {
  strategy: string;
  impactOnBudget: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  steps: string[];
  rationale: string;
}

export const getSetMitigation = async (
  latency: number, 
  remainingShots: number, 
  environmentalSignals: any,
  requiredVelocity: number
): Promise<ProductionMitigation> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    ROLE: Elite Fashion Production Showrunner (Director of Production).
    
    TELEMETRY:
    - Current Latency: ${latency} minutes behind schedule.
    - Remaining Deliverables: ${remainingShots} hero looks.
    - Required Velocity: ${Math.round(requiredVelocity)} minutes per look to wrap before sunset.
    - Environment: ${JSON.stringify(environmentalSignals)}

    TASK: Provide a high-stakes, realistic mitigation strategy to recover schedule drift without losing core brand assets.
    
    STRATEGIC CONSTRAINTS:
    - If required velocity is < 30m, suggest "The Kill List" (skipping low-priority details).
    - If weather is deteriorating, prioritize outdoor looks immediately.
    - Focus on crew turnover and lighting efficiency.
    
    RETURN: A structured response with a specific strategy, technical steps, and risk assessment.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategy: { type: Type.STRING },
            rationale: { type: Type.STRING },
            impactOnBudget: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            steps: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["strategy", "rationale", "impactOnBudget", "riskLevel", "steps"]
        },
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Agent failed to respond.");
    
    return JSON.parse(text);
  } catch (e) {
    console.error("Showrunner logic failure:", e);
    return {
      strategy: "Consolidate lighting rigs and execute high-priority Hero looks only.",
      rationale: "Current velocity is unsustainable for the full shot list.",
      impactOnBudget: "Neutral",
      riskLevel: 'Medium',
      steps: [
        "Identify Top 3 Hero Looks for immediate capture",
        "Merge lighting setups for next two scenes",
        "Pre-prep talent styling in parallel"
      ]
    };
  }
};