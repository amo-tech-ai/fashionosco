
import React, { useState, useEffect } from 'react';
import { 
  X, Play, Pause, SkipForward, Users, Clock, 
  Radio, Zap, Volume2, Maximize2, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { TalentStatus, ReadinessStatus, ProductionCue } from '../../../types/production';

export const ProductionDesk: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { activeCampaign } = useActiveCampaign();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeCueIndex, setActiveCueIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const [talent, setTalent] = useState<TalentStatus[]>([
    { id: '1', name: 'Sarah Jenkins', role: 'Model', status: 'ready', assignment: 'Look 01, 12' },
    { id: '2', name: 'Bella Hadid', role: 'Model', status: 'dressed', assignment: 'Look 02, 15' },
    { id: '3', name: 'Marcus Chen', role: 'Lead Stylist', status: 'ready' },
    { id: '4', name: 'Amara Diop', role: 'MUA', status: 'arrived' },
  ]);

  const [cues, setCues] = useState<ProductionCue[]>([
    { id: '1', time: '19:00', duration: '5m', title: 'HOUSE DIM / INTRO VIDEO', description: 'Fade house to 10%. Trigger loop B.', category: 'logistics', status: 'confirmed', isComplete: false, audioCue: 'Track 01: Ambient Noir', lightingCue: 'Blue Wash 20%', stageCue: 'Close Main Curtains' },
    { id: '2', time: '19:05', duration: '2m', title: 'OPENING LOOK: SILK SERIES', description: 'Model 1 enters from Stage Left.', category: 'runway', status: 'confirmed', isComplete: false, audioCue: 'Bass Drop Sync', lightingCue: 'Pin Spot Center', stageCue: 'Model 1 Release' },
    { id: '3', time: '19:07', duration: '15m', title: 'MAIN CATWALK SEQUENCE', description: 'Interval release every 25s.', category: 'runway', status: 'confirmed', isComplete: false, audioCue: 'Show Mix Loop', lightingCue: 'Full Runway White', stageCue: 'Sequential Release' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTalentStatus = (id: string) => {
    const statuses: ReadinessStatus[] = ['pending', 'arrived', 'in-makeup', 'dressed', 'ready'];
    setTalent(prev => prev.map(t => {
      if (t.id === id) {
        const currentIdx = statuses.indexOf(t.status);
        const nextStatus = statuses[(currentIdx + 1) % statuses.length];
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const currentCue = cues[activeCueIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col font-mono selection:bg-red-600">
      <header className="h-20 border-b border-white/10 flex justify-between items-center px-10 bg-black">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]' : 'bg-gray-600'}`}></div>
            <span className={`text-xs font-black tracking-[0.4em] ${isRunning ? 'text-red-600' : 'text-gray-500'}`}>
              {isRunning ? 'PRODUCTION LIVE' : 'STANDBY'}
            </span>
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <div className="flex items-center gap-3 text-gray-500">
            <Radio size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{activeCampaign?.title} // CONSOLE 01</span>
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 text-4xl font-bold tracking-tighter tabular-nums">
          {currentTime.toLocaleTimeString([], { hour12: false })}
        </div>

        <div className="flex items-center gap-6">
          <button className="text-gray-500 hover:text-white transition-colors"><Maximize2 size={20} /></button>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all">
            <X size={24} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-96 border-r border-white/10 flex flex-col bg-[#080808]">
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3">
              <Users size={16} /> Crew Readiness
            </h3>
            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">ALL GREEN</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-3 hide-scrollbar">
            {talent.map(t => (
              <div 
                key={t.id} 
                onClick={() => toggleTalentStatus(t.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                  t.status === 'ready' ? 'bg-green-500/5 border-green-500/30' :
                  t.status === 'dressed' ? 'bg-blue-500/5 border-blue-500/30' :
                  'bg-white/5 border-white/5 opacity-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold truncate pr-2 group-hover:text-white transition-colors">{t.name}</span>
                  <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest ${
                    t.status === 'ready' ? 'bg-green-500 text-black' : 'bg-white/10 text-gray-400'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <div className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold">{t.role} {t.assignment && `• ${t.assignment}`}</div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_center,#111_0%,#050505_100%)]">
           <div className="p-20 flex-1 flex flex-col justify-center">
              <div className="mb-20">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="bg-red-600 text-white text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1 rounded shadow-lg shadow-red-900/40">ACTIVE CUE</span>
                    <span className="text-gray-600 text-[10px] font-bold tracking-[0.2em]">SEQ_00{activeCueIndex + 1} // MASTER</span>
                 </div>
                 <h1 className="text-8xl lg:text-[10rem] font-serif font-bold leading-none tracking-tighter mb-12 animate-in fade-in slide-in-from-left duration-700">
                    {currentCue.title}
                 </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] group hover:border-blue-500/50 transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 text-blue-400 mb-6">
                       <Volume2 size={20} />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em]">Audio Feed</span>
                    </div>
                    <p className="text-xl font-light leading-relaxed text-gray-300">{currentCue.audioCue}</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] group hover:border-yellow-500/50 transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 text-yellow-400 mb-6">
                       <Zap size={20} />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em]">Lighting Grid</span>
                    </div>
                    <p className="text-xl font-light leading-relaxed text-gray-300">{currentCue.lightingCue}</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] group hover:border-purple-500/50 transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 text-purple-400 mb-6">
                       <Radio size={20} />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em]">Stage Command</span>
                    </div>
                    <p className="text-xl font-light leading-relaxed text-gray-300">{currentCue.stageCue}</p>
                 </div>
              </div>
           </div>

           <div className="p-12 bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-6">
                 <button 
                  onClick={() => setIsRunning(!isRunning)}
                  className={`group flex items-center gap-4 px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all ${
                    isRunning ? 'bg-yellow-500 text-black shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-105'
                  }`}
                 >
                    {isRunning ? <><Pause size={24} fill="currentColor" /> PAUSE SESSION</> : <><Play size={24} fill="currentColor" /> START PRODUCTION</>}
                 </button>
                 <button 
                  onClick={() => activeCueIndex < cues.length - 1 && setActiveCueIndex(i => i + 1)}
                  className="flex items-center gap-4 px-12 py-6 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-200 hover:scale-105 transition-all active:scale-95"
                 >
                    ADVANCE CUE <SkipForward size={24} fill="currentColor" />
                 </button>
              </div>
              
              <div className="text-right">
                 <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">Network Latency</div>
                 <div className="text-2xl font-bold text-green-500 flex items-center gap-3 justify-end">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> 14MS // OPTIMAL
                 </div>
              </div>
           </div>
        </main>

        <aside className="w-96 border-l border-white/10 bg-[#050505] flex flex-col">
          <div className="p-8 border-b border-white/10 bg-black/40">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Show Flow</h3>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {cues.map((cue, idx) => (
              <div 
                key={cue.id}
                className={`p-8 border-b border-white/5 transition-all duration-500 ${
                  idx === activeCueIndex ? 'bg-purple-600/10 border-l-4 border-l-purple-600 opacity-100' : 
                  idx < activeCueIndex ? 'opacity-20 grayscale' : 'opacity-40 hover:opacity-100'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold ${idx === activeCueIndex ? 'text-purple-400' : 'text-gray-400'}`}>{cue.time}</span>
                  <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{cue.duration}</span>
                </div>
                <h4 className={`font-bold text-base tracking-tight ${idx === activeCueIndex ? 'text-white' : 'text-gray-500'}`}>{cue.title}</h4>
                {idx === activeCueIndex && (
                  <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase text-purple-400 animate-pulse">
                    <Clock size={12} /> Live Tracking Active
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
