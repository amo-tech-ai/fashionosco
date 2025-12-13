
import React from 'react';
import { Send } from 'lucide-react';

interface RefinementBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isGenerating: boolean;
}

export const RefinementBar: React.FC<RefinementBarProps> = ({
  value,
  onChange,
  onSubmit,
  isGenerating,
}) => {
  return (
    <div className="p-3 border-t border-gray-100 bg-gray-50 flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && value && onSubmit()}
        placeholder="Example: 'Make it moodier', 'Add more shoe shots', 'Remove flatlays'..."
        className="flex-1 bg-white border border-gray-200 rounded-lg px-3 text-xs focus:outline-none focus:border-purple-400 transition-colors"
      />
      <button
        onClick={onSubmit}
        disabled={!value || isGenerating}
        className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
      >
        <Send size={14} />
      </button>
    </div>
  );
};
