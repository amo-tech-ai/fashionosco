import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface ProductionTask {
  id: string;
  title: string;
  phase: 'Concept' | 'Sourcing' | 'Production' | 'Logistics';
  priority: 'high' | 'medium' | 'low';
  description: string;
  dependencies: string[];
  is_load_bearing: boolean;
  sub_checklist: string[];
}

export const generateProductionWorkflow = async (brief: string): Promise<ProductionTask[]> => {
  const prompt = `
    System Instruction: You are the Chief of Staff for a luxury fashion house.
    1. Consume the project brief: "${brief}".
    2. Decompose into 4 critical phases: Concept, Sourcing, Production, Logistics.
    3. For each phase, identify 3 'Load-Bearing' tasks.
    4. For each task, generate a sub-checklist that includes compliance (ESG), technical (Lighting/AV), and talent (Casting) requirements.
    5. Identify cross-phase dependencies (Task A must finish for Task B to start).
    6. Output strictly in JSON as an array of Task objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 4096 }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Workflow Gen Error:", error);
    return [];
  }
};