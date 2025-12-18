
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System Tools for the OS
const systemTools: FunctionDeclaration[] = [
  {
    name: "update_shot_priority",
    description: "Update the priority of a specific shot in the active list.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        shotId: { type: Type.STRING },
        priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
      },
      required: ["shotId", "priority"]
    }
  },
  {
    name: "find_talent_match",
    description: "Search the directory for talent matching specific aesthetic keywords.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        vibe: { type: Type.STRING },
        location: { type: Type.STRING }
      },
      required: ["vibe"]
    }
  }
];

export const processSystemIntent = async (message: string, context: any) => {
  const model = 'gemini-3-pro-preview';
  
  const systemInstruction = `
    ROLE: You are the FashionOS Master Orchestrator.
    CONTEXT: User is currently managing a campaign called "${context.campaignTitle}".
    GOAL: Translate user requests into system actions or strategic advice.
    TONE: Direct, sophisticated, and efficient.
  `;

  const response = await ai.models.generateContent({
    model: model,
    contents: message,
    config: {
      systemInstruction,
      tools: [{ functionDeclarations: systemTools }],
      thinkingConfig: { thinkingBudget: 1024 }
    }
  });

  return {
    text: response.text,
    calls: response.functionCalls
  };
};
