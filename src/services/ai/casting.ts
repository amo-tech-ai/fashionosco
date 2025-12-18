
import { GoogleGenAI, Type } from "@google/genai";
import { Stakeholder } from "../data/stakeholders";

export interface CastingFit {
  id: string;
  fitScore: number;
  reasoning: string;
  suggestedRole: string;
}

export const analyzeCastingFit = async (vibe: string, talentList: Stakeholder[]): Promise<CastingFit[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    ROLE: Elite Fashion Casting Director.
    TASK: Rank the following talent based on their fit for a "${vibe}" campaign.
    
    CANDIDATES:
    ${JSON.stringify(talentList.map(t => ({ id: t.id, name: t.name, role: t.role, tags: t.tags })))}

    OBJECTIVE: Assign a fit score (0-100) and specific strategic reason for each.
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
            matches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  fitScore: { type: Type.NUMBER },
                  reasoning: { type: Type.STRING },
                  suggestedRole: { type: Type.STRING }
                },
                required: ["id", "fitScore", "reasoning"]
              }
            }
          },
          required: ["matches"]
        }
      }
    });

    const data = JSON.parse(response.text || '{"matches":[]}');
    return data.matches;
  } catch (error) {
    console.error("Casting Intelligence Error:", error);
    return [];
  }
};
