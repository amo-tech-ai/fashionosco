import React, { useEffect, useState } from 'react';
import { useShootWizard } from '../../../../contexts/ShootWizardContext';
import { Sparkles, Check } from 'lucide-react';

const STATUS_MESSAGES = [
  "Mapping website structure...",
  "Analyzing visual DNA from Instagram...",
  "Extracting product composition...",
  "Benchmarking category trends...",
  "Generating campaign strategy...",
  "Synthesizing ROI predictions..."
];

export const ThinkingState: React.FC = () => {
  const { dispatch } = useShootWizard();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2500);

    // Simulate analysis completion
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_STRATEGY', strategy: { /* Mock Data */ } });
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-1000">
      {/* The Ethereal Orb */}
      <div className="relative mb-16">
        <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-purple-500/20 via-rose-500/10 to-blue-500/20 blur-[60px] animate-pulse-glow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 luxury-card flex items-center justify-center animate-float">
            <Sparkles size={32} className="text-purple-600 animate-pulse" />
          </div>
        </div>
        {/* Orbiting particles */}
        <div className="absolute inset-[-20px] rounded-full border border-gray-100 border-dashed animate-[spin_20s_linear_infinite]"></div>
      </div>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-100 rounded-full shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Gemini 3 Pro Active</span>
        </div>
        <h2 className="text-3xl font-serif text-black">{STATUS_MESSAGES[index]}</h2>
        <div className="flex justify-center gap-2 pt-4">
          {STATUS_MESSAGES.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= index ? 'w-4 bg-purple-600' : 'w-1 bg-gray-100'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};