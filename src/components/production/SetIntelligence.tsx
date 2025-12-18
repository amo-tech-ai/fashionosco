
import React from 'react';
import { Zap, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

interface SetIntelligenceProps {
  latency: number;
  progress: number;
  isBehind: boolean;
}

export const SetIntelligence: React.FC<SetIntelligenceProps> = ({ latency, progress, isBehind }) => {
  return (
    <div className={`luxury-card p-6 border-l-4 transition-all duration-700 ${
      isBehind ? 'border-l-red-500 bg-red-50/10' : 'border-l-purple-500 bg-purple-50/10'
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isBehind ? 'bg-red-500 text-white' : 'bg-purple-600 text-white'}`}>
            <Activity size={18} />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Set Intelligence</h3>
            <div className="text-lg font-serif font-bold text-gray-900">
              {isBehind ? 'Velocity Critical' : 'Optimal Pace'}
            </div>
          </div>
        </div>
        <div className="text-right">
           <div className={`text-2xl font-mono font-bold ${isBehind ? 'text-red-600' : 'text-purple-600'}`}>
             {isBehind ? `+${latency}m` : 'On Track'}
           </div>
           <span className="text-[10px] font-bold text-gray-400 uppercase">Schedule Delta</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500">
          <span>Overall Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${isBehind ? 'bg-red-500' : 'bg-purple-600'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {isBehind && (
          <div className="bg-red-600 text-white p-4 rounded-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Strategy Active</span>
            </div>
            <p className="text-xs leading-relaxed font-medium">
              "Behind by {latency}m. I've prioritized Hero Samples only. Recommend skipping 20m of BTS B-Roll to recover the sunset window."
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
