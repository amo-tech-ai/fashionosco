
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

// System Tools for the OS - verified schemas for Gemini 3
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
  },
  {
    name: "navigate_to",
    description: "Move the user to a different area of the application.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        path: { type: Type.STRING, description: "Relative URL path (e.g. /dashboard/products)" }
      },
      required: ["path"]
    }
  }
];

export const processSystemIntent = async (message: string, context: any) => {
  // Use pre-configured API Key from process.env
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-pro-preview';
  
  const systemInstruction = `
    ROLE: You are the FashionOS Master Orchestrator, an elite production strategist.
    CONTEXT: User is currently in the ${context.path || 'main'} area managing "${context.campaignTitle || 'Active Campaign'}".
    GOAL: Translate user requests into system actions or sophisticated strategic advice.
    TONE: Professional, direct, and industry-savvy. Use terms like 'WSP', 'MOQ', 'Linesheet', and 'Editorial'.

    When a user asks to see something or find something, use the 'navigate_to' or 'find_talent_match' tools.
  `;

  try {
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
  } catch (error: any) {
    console.error("Orchestration Error:", error);
    // Graceful error text for UI
    if (error.message?.includes("API_KEY")) {
       return { text: "System intelligence requires a valid production link. Please verify your connection." };
    }
    throw error;
  }
};
