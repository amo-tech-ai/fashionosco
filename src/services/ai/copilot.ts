import { FunctionDeclaration, GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface CopilotMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const COPILOT_TOOLS: FunctionDeclaration[] = [
  {
    name: 'navigateTo',
    description: 'Navigate the user to a specific page within the application.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        path: {
          type: Type.STRING,
          description: 'The relative path to navigate to (e.g., /dashboard/shotlist, /create-profile).'
        }
      },
      required: ['path']
    }
  },
  {
    name: 'updateProjectField',
    description: 'Update a specific field in the active campaign or wizard state.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        field: {
          type: Type.STRING,
          description: 'The field name to update (e.g., vibe, shootType, location).'
        },
        value: {
          type: Type.STRING,
          description: 'The new value for the field.'
        }
      },
      required: ['field', 'value']
    }
  },
  {
    name: 'generateAsset',
    description: 'Trigger the generation of a specific asset like a social teaser or venue visualization.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        assetType: {
          type: Type.STRING,
          enum: ['social-teaser', 'venue-viz'],
          description: 'The type of asset to generate.'
        }
      },
      required: ['assetType']
    }
  }
];

export const startCopilotStream = async (
  message: string,
  history: CopilotMessage[],
  brandContext: any
) => {
  const systemInstruction = `
    ROLE: You are the "FashionOS Strategy Copilot". An elite production strategist.
    BRAND CONTEXT: ${JSON.stringify(brandContext)}
    
    GOAL: Help the user navigate the app and refine their production strategy.
    You have access to tools to interact with the UI. Use them when the user's intent matches navigation or project updates.
    
    TONE: Direct, sophisticated, and efficient.
  `;

  return ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction,
      tools: [{ functionDeclarations: COPILOT_TOOLS }],
      thinkingConfig: { thinkingBudget: 0 } // Low latency for UI interactions
    }
  });
};
