import { GoogleGenAI, Type } from "@google/genai";
import { ROIPrediction } from "../../types/roi";

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

export const generateROIPrediction = async (campaignData: any): Promise<ROIPrediction> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Fallback for Demo Mode
    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock ROI modeling');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_ROI_RESULT), 3000));
    }

    const response = await fetch(`${SUPABASE_FUNCTION_URL}/predict-roi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(campaignData),
    });

    if (!response.ok) throw new Error('ROI Modeling failed');
    return await response.json();
  } catch (error) {
    console.warn('ROI AI Fallback:', error);
    return MOCK_ROI_RESULT;
  }
};

const MOCK_ROI_RESULT: ROIPrediction = {
  id: "roi-mock-123",
  campaignId: "active",
  overallImpactScore: 88,
  estimatedReach: { min: 45000, max: 125000 },
  conversionLift: 24,
  metrics: [
    { label: "Engagement Rate", value: "4.2%", change: 1.2, trend: 'up', description: "Predicted vs. Category Baseline (3.0%)" },
    { label: "Save Velocity", value: "High", change: 0, trend: 'up', description: "Strong aesthetic alignment with 'Quiet Luxury' trend." },
    { label: "CPC Projection", value: "$0.85", change: -0.15, trend: 'down', description: "Optimized visuals reduced predicted ad costs." }
  ],
  competitorAnalysis: [
    { brandName: "Competitor A", overlap: 65, advantage: "Higher visual fidelity in macro shots", disadvantage: "Weaker video engagement" },
    { brandName: "Competitor B", overlap: 40, advantage: "First-mover aesthetic on SS25 palette", disadvantage: "Higher production overhead" }
  ],
  reasoning: "The shot list contains a 30% ratio of high-engagement video assets. By utilizing chiaroscuro lighting (identified in your moodboard), the content aligns with current high-performing editorial benchmarks for contemporary luxury. This strategy is predicted to drive a 24% lift in click-through rates compared to your previous campaign.",
  generatedAt: new Date().toISOString()
};
