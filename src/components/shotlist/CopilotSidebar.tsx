
import React from 'react';
import { Sparkles, Loader2, Send } from 'lucide-react';
import { ShotItem } from '../../types/shotlist';

interface CopilotSidebarProps {
  shots: ShotItem[];
  copilotInput: string;
  setCopilotInput: (val: string) => void;
  isCopilotLoading: boolean;
  onCopilotSubmit: () => void;
  onAddShot: () => void;
}

export const CopilotSidebar: React.FC<CopilotSidebarProps> = ({
  shots,
  copilotInput,
  setCopilotInput,
  isCopilotLoading,
  onCopilotSubmit,
  onAddShot
}) => {
  const completedCount = shots.filter(s => s.status === 'Shot').length;
  const progressPercent = shots.length > 0 ? (completedCount / shots.length) * 100 : 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCopilotSubmit();
    }
  };

  return (
    <div className="w-full md:w-72 bg-gradient-to-b from-[#FFFFFF] to-[#F7F7F5] border-l border-[#E5E5E5] p-6 hidden lg:flex flex-col rounded-l-2xl -mr-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-[#6B21A8]">
        <Sparkles size={18} />
        <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">AI Copilot</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-[#F3E8FF] border border-[#E9D5FF] rounded-xl p-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#6B21A8] mb-2">Suggestion</h4>
          <p className="text-sm text-[#4A4F5B] leading-relaxed mb-3">
            Consider adding a <strong>detail shot</strong> of the stitching to highlight the quality mentioned in the brief.
          </p>
          <button onClick={onAddShot} className="w-full bg-white text-[#6B21A8] py-2 rounded-lg text-xs font-bold border border-[#E9D5FF] hover:bg-[#FAF5FF] transition-colors shadow-sm">
            Add Detail Shot
          </button>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-2">Progress</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#1A1A1A]">Shots Completed</span>
              <span className="text-[#6B7280]">{completedCount}/{shots.length}</span>
            </div>
            <div className="w-full bg-[#F7F7F5] rounded-full h-1.5">
              <div 
                className="bg-[#1A1A1A] h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className={`relative bg-white border transition-colors p-3 rounded-lg shadow-sm ${isCopilotLoading ? 'border-purple-300 bg-purple-50' : 'border-[#E5E5E5]'}`}>
          <input 
            type="text" 
            value={copilotInput}
            onChange={(e) => setCopilotInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isCopilotLoading}
            placeholder={isCopilotLoading ? "AI is thinking..." : "Ask AI to generate shots..."} 
            className="w-full text-xs border-none focus:outline-none placeholder-[#9CA3AF] bg-transparent pr-8" 
          />
          {isCopilotLoading ? (
            <Loader2 className="animate-spin h-3 w-3 text-purple-600 absolute right-3 top-3.5" />
          ) : (
            <button 
              onClick={onCopilotSubmit} 
              className="absolute right-3 top-3.5 text-[#9CA3AF] hover:text-[#6B21A8] transition-colors disabled:opacity-50"
              disabled={!copilotInput.trim()}
            >
              <Send size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
