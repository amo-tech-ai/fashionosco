
import React from 'react';
import { Sparkles } from 'lucide-react';
import { useAssistant } from '../../contexts/AssistantContext';

export const AssistantFAB: React.FC = () => {
  const { openAssistant, isOpen } = useAssistant();

  if (isOpen) return null;

  return (
    <button
      onClick={openAssistant}
      className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle AI Assistant"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/40 via-transparent to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <Sparkles className="w-6 h-6 animate-pulse group-hover:scale-110 transition-transform" />
      </div>
      <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-100 animate-ping opacity-20 pointer-events-none"></div>
    </button>
  );
};
