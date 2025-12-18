import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Zap, 
  CheckCircle2, 
  Sun, 
  Loader2, 
  RefreshCw, 
  Clock 
} from 'lucide-react';
import { getSetMitigation, ProductionMitigation } from '../../services/ai/productionAgents';

interface SetIntelligenceProps {
  latency: number;
  progress: number;
  isBehind: boolean;
  health: 'optimal' | 'warning' | 'critical';
  remainingShots: number;
  requiredVelocity: number;
}

export const SetIntelligence: React.FC<SetIntelligenceProps> = ({ 
  latency, 
  progress, 
  isBehind, 
  health,
  remainingShots,
  requiredVelocity
}) => {
  const [mitigation, setMitigation] = useState<ProductionMitigation | null>(null);
  const [isConsulting, setIsConsulting] = useState(false);

  useEffect(() => {
    if (isBehind && !mitigation) {
      handleConsultShowrunner();
    }
    if (!isBehind) setMitigation(null);
  }, [isBehind, health, mitigation]);

  const handleConsultShowrunner = async () => {
    setIsConsulting(true);
    try {
      const result = await getSetMitigation(latency, remainingShots, { weather: 'Dynamic' }, requiredVelocity);
      setMitigation(result);
    } finally {
      setIsConsulting(false);
    }
  };

  const statusColors = {
    optimal: 'border-l-green-500 bg-green-50/10 text-green-700',
    warning: 'border-l-orange-500 bg-orange-50/10 text-orange-700',
    critical: 'border-l-red-500 bg-red-50/10 text-red-700'
  };

  return (
    <div className={`luxury-card p-6 border-l-4 transition-all duration-700 ${statusColors[health]} backdrop-blur-xl`}>
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl shadow-lg ${
            health === 'optimal' ? 'bg-green-600' : 
            health === 'warning' ? 'bg-orange-600' : 'bg-red-600'
          } text-white transition-colors duration-500`}>
            <Activity size={18} />
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 font-sans">Set Telemetry</h3>
            <div className="text-xl font-serif font-bold text-gray-900 leading-tight">
              {health === 'critical' ? 'Velocity Critical' : 
               health === 'warning' ? 'Temporal Drift' : 'Flow Nominal'}
            </div>
          </div>
        </div>
        <div className="text-right">
           <div className={`text-3xl font-mono font-bold ${isBehind ? 'text-red-600' : 'text-green-600'}`}>
             {isBehind ? `+${latency}m` : '0m'}
           </div>
           <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-sans">Delta</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest font-sans">
              <span className="text-gray-400">Total Progress</span>
              <span className="text-gray-900">{Math.round(progress)}%</span>
           </div>
           <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  health === 'critical' ? 'bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 
                  health === 'warning' ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
           </div>
        </div>

        {isBehind && (
          <div className="bg-[#0A0A0A] text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden group animate-in fade-in zoom-in-95">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all duration-1000"></div>
            
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                     <Zap size={14} className="text-purple-400 animate-pulse" fill="currentColor" />
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400 font-sans">Showrunner Logic</span>
                  </div>
                  {mitigation && (
                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest font-sans ${
                      mitigation.riskLevel === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {mitigation.riskLevel} Risk
                    </span>
                  )}
               </div>

               {isConsulting ? (
                 <div className="space-y-3 py-4">
                    <div className="h-3 bg-white/5 rounded-full w-full animate-pulse"></div>
                    <div className="h-3 bg-white/5 rounded-full w-4/5 animate-pulse"></div>
                 </div>
               ) : mitigation ? (
                 <div className="space-y-4">
                    <p className="text-xs leading-relaxed text-gray-300 font-light italic border-l border-purple-500/50 pl-3 font-sans">
                      "{mitigation.strategy}"
                    </p>
                    <div className="space-y-2">
                       {mitigation.steps.slice(0, 3).map((step, i) => (
                         <div key={i} className="flex items-start gap-2 text-[10px] text-gray-500">
                            <CheckCircle2 size={12} className="text-purple-500 shrink-0 mt-0.5" />
                            <span className="font-sans">{step}</span>
                         </div>
                       ))}
                    </div>
                 </div>
               ) : null}

               <button 
                onClick={handleConsultShowrunner}
                disabled={isConsulting}
                className="mt-6 w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-sans"
               >
                 {isConsulting ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                 Refresh Strategy
               </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2">
           <div className="bg-white/50 border border-gray-100 p-4 rounded-xl flex flex-col gap-1">
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest font-sans">Required Velocity</span>
              <span className="text-sm font-mono font-bold flex items-center gap-1.5">
                 <Clock size={12} className="text-blue-500" /> {Math.round(requiredVelocity)}m <span className="text-[10px] font-normal text-gray-400 font-sans">/look</span>
              </span>
           </div>
           <div className="bg-white/50 border border-gray-100 p-4 rounded-xl flex flex-col gap-1">
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest font-sans">Set Condition</span>
              <span className="text-sm font-mono font-bold flex items-center gap-1.5">
                 <Sun size={12} className="text-orange-400" /> Golden Hour <span className="text-[10px] font-normal text-gray-400 font-sans">17:40</span>
              </span>
           </div>
        </div>
      </div>
    </div>
  );
};