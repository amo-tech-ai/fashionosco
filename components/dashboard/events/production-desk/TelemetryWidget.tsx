import React from 'react';
import { Activity, Clock, Zap, AlertTriangle, CloudSun } from 'lucide-react';

interface TelemetryWidgetProps {
  stats: {
    latency: number;
    progress: number;
    health: 'optimal' | 'warning' | 'critical';
    requiredMinutesPerLook: number;
  };
}

export const TelemetryWidget: React.FC<TelemetryWidgetProps> = ({ stats }) => {
  const isHealthy = stats.health === 'optimal';
  
  return (
    <div className={`p-8 rounded-[2rem] border transition-all duration-700 ${
      stats.health === 'critical' ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.1)]' :
      stats.health === 'warning' ? 'bg-orange-950/20 border-orange-500/50' :
      'bg-green-950/10 border-green-500/30'
    }`}>
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${
            stats.health === 'critical' ? 'bg-red-600' :
            stats.health === 'warning' ? 'bg-orange-600' :
            'bg-green-600'
          } text-white shadow-xl`}>
            <Activity size={20} />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Set Telemetry</h4>
            <div className="text-xl font-bold tracking-tight">
              {stats.health === 'critical' ? 'Velocity Critical' : 
               stats.health === 'warning' ? 'Temporal Drift' : 'Peak Flow'}
            </div>
          </div>
        </div>
        <div className="text-right">
           <div className={`text-4xl font-mono font-bold ${stats.latency > 0 ? 'text-red-500' : 'text-green-500'}`}>
             {stats.latency > 0 ? `+${stats.latency}m` : '0m'}
           </div>
           <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Delta</span>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
           <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              <span>Overall Completion</span>
              <span className="text-white">{Math.round(stats.progress)}%</span>
           </div>
           <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${isHealthy ? 'bg-green-500' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}
                style={{ width: `${stats.progress}%` }}
              ></div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Required Speed</span>
              <div className="flex items-center gap-2 text-white font-mono font-bold">
                 <Zap size={14} className="text-yellow-400" />
                 {Math.round(stats.requiredMinutesPerLook)}m <span className="text-[9px] font-normal text-gray-400">/ Look</span>
              </div>
           </div>
           <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sunset Window</span>
              <div className="flex items-center gap-2 text-white font-mono font-bold">
                 <CloudSun size={14} className="text-orange-400" />
                 17:42 <span className="text-[9px] font-normal text-gray-400">(-104m)</span>
              </div>
           </div>
        </div>

        {stats.health !== 'optimal' && (
          <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 flex items-start gap-4 animate-in slide-in-from-bottom-2">
             <AlertTriangle className="text-red-500 shrink-0" size={18} />
             <p className="text-[11px] text-gray-400 leading-relaxed italic font-light">
               "AI Showrunner: Suggesting immediate pivot to 'The Kill List'. Deprioritize back-view details for next 2 scenes."
             </p>
          </div>
        )}
      </div>
    </div>
  );
};