
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Sparkles, Camera, Layers, X } from 'lucide-react';

export const OnboardingOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeen = localStorage.getItem('wizard_onboarding_seen');
    if (!hasSeen) {
      // Delay slightly for dramatic entrance
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('wizard_onboarding_seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleDismiss}></div>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative z-10 overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Header Graphic */}
        <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
           <div className="text-center text-white space-y-1">
              <Sparkles className="w-10 h-10 mx-auto mb-2 text-yellow-300 animate-pulse" />
              <h2 className="font-serif text-2xl font-bold">Welcome to FashionOS</h2>
              <p className="text-xs uppercase tracking-widest opacity-80">AI-Powered Production</p>
           </div>
           <button onClick={handleDismiss} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
              <X size={24} />
           </button>
        </div>

        <div className="p-8 space-y-6">
           <p className="text-gray-600 text-center leading-relaxed">
              Our intelligent wizard helps you plan, price, and book your next shoot in minutes. Here's what's new:
           </p>

           <div className="space-y-4">
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                    <Camera className="w-5 h-5 text-purple-600" />
                 </div>
                 <div>
                    <h3 className="font-bold text-sm text-gray-900">Vision Analysis</h3>
                    <p className="text-xs text-gray-500">Upload your moodboard and let Gemini AI extract color palettes and lighting cues.</p>
                 </div>
              </div>
              
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5 text-blue-600" />
                 </div>
                 <div>
                    <h3 className="font-bold text-sm text-gray-900">Auto Shot List</h3>
                    <p className="text-xs text-gray-500">Generate a detailed, prioritized shot list based on your creative direction automatically.</p>
                 </div>
              </div>
           </div>

           <div className="pt-4">
              <Button onClick={handleDismiss} className="w-full justify-center">Get Started</Button>
           </div>
        </div>
      </div>
    </div>
  );
};
