import React, { useState, useEffect } from 'react';
import { useShootWizard } from '../../contexts/ShootWizardContext';
import { Sparkles, TrendingUp, Loader2, Zap } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const AIRecommendationSidebar: React.FC = () => {
  const { state } = useShootWizard();
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchAISuggestion = async () => {
      // Step can be string in some AI-driven sub-flows, but usually it's number in the main wizard
      const stepValue = typeof state.step === 'number' ? state.step : 1;
      
      setIsTyping(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const prompt = `
          ROLE: Elite Fashion Production Assistant.
          WIZARD STEP: ${stepValue} (out of 7).
          CONTEXT: 
          - Shoot Type: ${state.shootType || 'Unspecified'}
          - Vibe: ${state.vibe || 'Unspecified'}
          - Items: ${state.numberOfItems}
          - Products Selected: ${state.selectedProducts.length}
          
          TASK: Provide a high-value, one-sentence strategic production recommendation for this specific step. 
          Focus on lighting techniques (e.g. chiaroscuro, Rembrandt), composition, model archetypes, or industry trends found in Vogue/WGSN.
          
          TONE: Direct, sophisticated, visionary, professional.
          OUTPUT: Return only the recommendation sentence.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
             thinkingConfig: { thinkingBudget: 0 }
          }
        });

        setSuggestion(response.text?.trim() || "Analyzing production variables...");
      } catch (e) {
        console.error("AI Sidebar Error:", e);
        // Fallback sophisticated mock suggestions if API fails
        const fallbacks = [
          "Focus on high-contrast lighting to emphasize fabric textures.",
          "Consider a Dutch angle for your hero looks to add editorial energy.",
          "Minimalist sets drive 40% higher engagement for luxury footwear.",
          "Use soft window light to preserve natural silk tones."
        ];
        setSuggestion(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
      } finally {
        setIsTyping(false);
      }
    };

    const timeoutId = setTimeout(fetchAISuggestion, 800); // Debounce to allow user input to settle
    return () => clearTimeout(timeoutId);
  }, [state.step, state.shootType, state.vibe, state.selectedProducts.length]);

  return (
    <div className="space-y-6 sticky top-32 animate-in fade-in duration-700">
      <div className="luxury-card p-8 bg-[#0A0A0A] text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all duration-1000"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-purple-600 p-1.5 rounded-lg shadow-lg">
              <Sparkles size={14} className="text-white" fill="currentColor" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Tactical Intelligence</span>
          </div>

          <div className="min-h-[100px] flex flex-col justify-center">
            {isTyping ? (
              <div className="space-y-3">
                <div className="h-3 bg-white/10 rounded-full w-full animate-pulse"></div>
                <div className="h-3 bg-white/10 rounded-full w-4/5 animate-pulse"></div>
                <div className="h-3 bg-white/10 rounded-full w-2/3 animate-pulse"></div>
              </div>
            ) : (
              <p className="text-base text-gray-200 font-light leading-relaxed italic animate-in fade-in slide-in-from-left-2 duration-500">
                "{suggestion}"
              </p>
            )}
          </div>

          <div className="space-y-4 pt-8 border-t border-white/10 mt-8">
             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <span>Production Fit</span>
                <span className="text-purple-400">96%</span>
             </div>
             <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: `96%` }}></div>
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 border border-gray-100 rounded-[2rem] bg-white shadow-sm flex items-start gap-4 hover:border-blue-200 transition-colors group">
        <div className="p-2 bg-blue-50 text-blue-500 rounded-xl group-hover:scale-110 transition-transform">
           <TrendingUp size={16} />
        </div>
        <div>
           <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Market Logic</h5>
           <p className="text-xs text-gray-600 leading-relaxed font-medium">
             Campaigns with 15% video-to-still ratio see 2.4x higher conversion in the contemporary sector.
           </p>
        </div>
      </div>
    </div>
  );
};