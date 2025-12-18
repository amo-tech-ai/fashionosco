
import { GoogleGenAI } from "@google/genai";

export const getSetMitigation = async (latency: number, remainingShots: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      ROLE: Production Manager Agent.
      CONTEXT: A fashion shoot is currently ${latency} minutes behind schedule. 
      REMAINING: ${remainingShots} looks to capture before sunset.
      GOAL: Provide 1 concise, brutal mitigation strategy.
    `,
    config: {
        thinkingConfig: { thinkingBudget: 0 }
    }
  });

  return response.text;
};
