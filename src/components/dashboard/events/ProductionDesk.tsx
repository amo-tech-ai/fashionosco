import React, { useState, useEffect } from 'react';
import { 
  X, Play, Pause, SkipForward, Users, Clock, 
  Radio, Zap, Volume2, Maximize2, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { TalentStatus, ReadinessStatus, ProductionCue } from '../../../types/production';
import { Button } from '../../Button';

export const ProductionDesk: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { activeCampaign } = useActiveCampaign();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeCueIndex, setActiveCueIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Mock Production Data - In a real app, this would come from the Event Context
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

  const nextCue = () => {
    if (activeCueIndex < cues.length - 1) {
      setActiveCueIndex(prev => prev + 1);
    }
  };

  const currentCue = cues[activeCueIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col font-mono selection:bg-red-600">
      
      {/* Top Console Bar */}
      <header className="h-16 border-b border-white/10 flex justify-between items-center px-8 bg-black">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-red-600 animate-pulse' : 'bg-gray-600'}`}></div>
            <span className={`text-[10px] font-black tracking-[0.3em] ${isRunning ? 'text-red-600' : 'text-gray-500'}`}>
              {isRunning ? 'LIVE SESSION' : 'STANDBY'}
            </span>
          </div>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center gap-2 text-gray-500">
            <Radio size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Producer: {activeCampaign?.title}</span>
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-tighter">
          {currentTime.toLocaleTimeString([], { hour12: false })}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-white transition-colors"><Maximize2 size={18} /></button>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Talent & Crew Monitor */}
        <aside className="w-80 border-r border-white/10 flex flex-col bg-[#0A0A0A]">
          <div className="p-6 border-b border-white/10 bg-black/40">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
              <Users size={14} /> Talent Monitor
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {talent.map(t => (
              <div 
                key={t.id} 
                onClick={() => toggleTalentStatus(t.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  t.status === 'ready' ? 'bg-green-500/10 border-green-500/30' :
                  t.status === 'dressed' ? 'bg-blue-500/10 border-blue-500/30' :
                  'bg-white/5 border-white/10 opacity-60'
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
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{t.role} {t.assignment && `• ${t.assignment}`}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center: Main Cue Engine */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_center,#111_0%,#050505_100%)]">
           <div className="p-12 flex-1 flex flex-col justify-center">
              <div className="mb-12">
                 <span className="text-red-600 text-xs font-black tracking-[0.3em] uppercase mb-4 block">Current Cue</span>
                 <h1 className="text-7xl lg:text-9xl font-serif font-bold leading-none tracking-tight mb-8">
                    {currentCue.title}
                 </h1>
                 <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400">
                       EST. DUR: {currentCue.duration}
                    </div>
                    <div className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-xs font-bold text-purple-400">
                       DEPT: {currentCue.category.toUpperCase()}
                    </div>
                 </div>
              </div>

              {/* Cue Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white/5 border border-white/10 p-6 rounded-2xl group hover:border-blue-500/50 transition-all">
                    <div className="flex items-center gap-2 text-blue-400 mb-4">
                       <Volume2 size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Audio</span>
                    </div>
                    <p className="text-lg leading-relaxed">{currentCue.audioCue || 'No cue set'}</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-6 rounded-2xl group hover:border-yellow-500/50 transition-all">
                    <div className="flex items-center gap-2 text-yellow-400 mb-4">
                       <Zap size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Lighting</span>
                    </div>
                    <p className="text-lg leading-relaxed">{currentCue.lightingCue || 'No cue set'}</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-6 rounded-2xl group hover:border-purple-500/50 transition-all">
                    <div className="flex items-center gap-2 text-purple-400 mb-4">
                       <Radio size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Stage</span>
                    </div>
                    <p className="text-lg leading-relaxed">{currentCue.stageCue || 'No cue set'}</p>
                 </div>
              </div>
           </div>

           {/* Controls Footer */}
           <div className="p-8 bg-black border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-4">
                 <button 
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
                    isRunning ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                  }`}
                 >
                    {isRunning ? <><Pause size={20} fill="currentColor" /> Pause Production</> : <><Play size={20} fill="currentColor" /> Start Show</>}
                 </button>
                 <button 
                  onClick={nextCue}
                  className="flex items-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
                 >
                    Next Cue <SkipForward size={20} fill="currentColor" />
                 </button>
              </div>
              
              <div className="text-right">
                 <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Production Status</div>
                 <div className="text-xl font-bold text-green-500 flex items-center gap-2">
                    <CheckCircle2 size={18} /> ON SCHEDULE
                 </div>
              </div>
           </div>
        </main>

        {/* Right: Queue List */}
        <aside className="w-80 border-l border-white/10 bg-[#050505] flex flex-col">
          <div className="p-6 border-b border-white/10 bg-black/40">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Upcoming Flow</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {cues.map((cue, idx) => (
              <div 
                key={cue.id}
                className={`p-6 border-b border-white/5 transition-all ${
                  idx === activeCueIndex ? 'bg-purple-600/10 border-l-4 border-l-purple-600' : 
                  idx < activeCueIndex ? 'opacity-20' : 'opacity-60'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-300">{cue.time}</span>
                  <span className="text-[10px] text-gray-500">{cue.duration}</span>
                </div>
                <h4 className="font-bold text-sm text-white mb-2">{cue.title}</h4>
                {idx === activeCueIndex + 1 && (
                  <div className="mt-2 text-[8px] font-black uppercase text-purple-400 bg-purple-400/10 px-2 py-1 rounded inline-block animate-pulse">
                    Up Next
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