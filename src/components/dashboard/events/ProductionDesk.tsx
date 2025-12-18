
import React, { useState, useEffect } from 'react';
import { 
  X, Play, Pause, SkipForward, Users, Clock, 
  Radio, Zap, Volume2, Maximize2, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { TalentStatus, ReadinessStatus, ProductionCue } from '../../../types/production';
import { useToast } from '../../ToastProvider';

export const ProductionDesk: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { activeCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeCueIndex, setActiveCueIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Real Data mapping from Timeline
  const [cues, setCues] = useState<ProductionCue[]>([]);
  
  const [talent, setTalent] = useState<TalentStatus[]>([
    { id: '1', name: 'Sarah Jenkins', role: 'Model', status: 'ready', assignment: 'Look 01, 12' },
    { id: '2', name: 'Bella Hadid', role: 'Model', status: 'dressed', assignment: 'Look 02, 15' },
    { id: '3', name: 'Marcus Chen', role: 'Lead Stylist', status: 'ready' },
    { id: '4', name: 'Amara Diop', role: 'MUA', status: 'arrived' },
  ]);

  useEffect(() => {
    if (activeCampaign?.data?.timeline) {
      setCues(activeCampaign.data.timeline.map((item: any) => ({
        ...item,
        audioCue: item.audioCue || 'Standby Audio',
        lightingCue: item.lightingCue || 'General Wash',
        stageCue: item.stageCue || 'Ready Models',
        isComplete: false
      })));
    } else {
        // Fallback for demo
        setCues([
            { id: '1', time: '19:00', duration: '5m', title: 'HOUSE DIM / INTRO VIDEO', description: 'Fade house to 10%. Trigger loop B.', category: 'logistics', status: 'confirmed', isComplete: false, audioCue: 'Track 01: Ambient Noir', lightingCue: 'Blue Wash 20%', stageCue: 'Close Main Curtains' },
        ]);
    }
  }, [activeCampaign]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextCue = () => {
    if (activeCueIndex < cues.length - 1) {
      setActiveCueIndex(prev => prev + 1);
      addToast(`Advancing to: ${cues[activeCueIndex + 1].title}`, "info");
    } else {
      addToast("End of show flow reached.", "success");
    }
  };

  const toggleShow = () => {
    setIsRunning(!isRunning);
    addToast(isRunning ? "Production Standby" : "Production Live", isRunning ? "info" : "success");
  };

  const currentCue = cues[activeCueIndex];

  if (!currentCue) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col font-mono selection:bg-red-600">
      <header className="h-16 border-b border-white/10 flex justify-between items-center px-8 bg-black">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]' : 'bg-gray-600'}`}></div>
            <span className={`text-[10px] font-black tracking-[0.3em] ${isRunning ? 'text-red-600' : 'text-gray-500'}`}>
              {isRunning ? 'PRODUCTION LIVE' : 'STANDBY'}
            </span>
          </div>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center gap-3 text-gray-500">
            <Radio size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{activeCampaign?.title || 'ACTIVE SHOW'} // CONSOLE 01</span>
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold tracking-tighter tabular-nums">
          {currentTime.toLocaleTimeString([], { hour12: false })}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-white transition-colors"><Maximize2 size={18} /></button>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-80 border-r border-white/10 flex flex-col bg-[#080808]">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-2">
              <Users size={14} /> Crew Readiness
            </h3>
            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">ALL GREEN</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 hide-scrollbar">
            {talent.map(t => (
              <div 
                key={t.id} 
                className={`p-4 rounded-xl border transition-all ${
                  t.status === 'ready' ? 'bg-green-500/5 border-green-500/30' :
                  t.status === 'dressed' ? 'bg-blue-500/5 border-blue-500/30' :
                  'bg-white/5 border-white/5 opacity-50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold truncate pr-2">{t.name}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase ${
                    t.status === 'ready' ? 'bg-green-500 text-black' : 'bg-white/10 text-gray-400'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{t.role} {t.assignment && `• ${t.assignment}`}</div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_center,#111_0%,#050505_100%)]">
           <div className="p-12 lg:p-24 flex-1 flex flex-col justify-center">
              <div className="mb-16">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="bg-red-600 text-white text-[9px] font-black tracking-[0.4em] uppercase px-3 py-1 rounded shadow-lg shadow-red-900/40">ACTIVE CUE</span>
                    <span className="text-gray-600 text-[10px] font-bold tracking-[0.2em]">SEQ_00{activeCueIndex + 1} // MASTER</span>
                 </div>
                 <h1 className="text-6xl lg:text-[8rem] font-serif font-bold leading-none tracking-tighter mb-12">
                    {currentCue.title}
                 </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-2 text-blue-400 mb-4">
                       <Volume2 size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Audio Feed</span>
                    </div>
                    <p className="text-xl font-light text-gray-300">{currentCue.audioCue}</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-yellow-500/50 transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-2 text-yellow-400 mb-4">
                       <Zap size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Lighting Rig</span>
                    </div>
                    <p className="text-xl font-light text-gray-300">{currentCue.lightingCue}</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-purple-500/50 transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-2 text-purple-400 mb-4">
                       <Radio size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Stage Command</span>
                    </div>
                    <p className="text-xl font-light text-gray-300">{currentCue.stageCue}</p>
                 </div>
              </div>
           </div>

           <div className="p-10 bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-4">
                 <button 
                  onClick={toggleShow}
                  className={`flex items-center gap-4 px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all ${
                    isRunning ? 'bg-yellow-500 text-black shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-105'
                  }`}
                 >
                    {isRunning ? <><Pause size={20} fill="currentColor" /> PAUSE SESSION</> : <><Play size={20} fill="currentColor" /> START PRODUCTION</>}
                 </button>
                 <button 
                  onClick={handleNextCue}
                  className="flex items-center gap-4 px-12 py-6 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-200 hover:scale-105 transition-all active:scale-95"
                 >
                    ADVANCE CUE <SkipForward size={20} fill="currentColor" />
                 </button>
              </div>
              
              <div className="text-right">
                 <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Network Latency</div>
                 <div className="text-xl font-bold text-green-500 flex items-center gap-3 justify-end">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> 14MS // OPTIMAL
                 </div>
              </div>
           </div>
        </main>

        <aside className="w-80 border-l border-white/10 bg-[#050505] flex flex-col">
          <div className="p-6 border-b border-white/10 bg-black/40">
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
