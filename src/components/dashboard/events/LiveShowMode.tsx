
import React, { useState, useEffect } from 'react';
import { X, Play, Pause, ChevronRight, Clock, SkipForward, Radio, Activity, CheckCircle, Loader2 } from 'lucide-react';
import { TimelineItem } from '../../../types/event-tools';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { CampaignService } from '../../../services/data/campaigns';
import { useToast } from '../../ToastProvider';

interface LiveShowModeProps {
  timeline: TimelineItem[];
  onClose: () => void;
}

export const LiveShowMode: React.FC<LiveShowModeProps> = ({ timeline, onClose }) => {
  const { activeCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [time, setTime] = useState(new Date());
  const [isFinishing, setIsFinishing] = useState(false);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Segment Timer
  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = window.setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentIndex < timeline.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setElapsed(0);
    } else {
      handleWrapShow();
    }
  };

  const handleWrapShow = async () => {
     if (!activeCampaign) return;
     setIsFinishing(true);
     try {
        await CampaignService.update(activeCampaign.id, { status: 'completed' });
        addToast("Production Wrapped. Campaign marked as Completed.", "success");
        onClose();
     } catch (e) {
        addToast("Failed to update show status.", "error");
        onClose();
     }
  };

  const currentItem = timeline[currentIndex];
  const nextItem = timeline[currentIndex + 1];

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A] text-white flex flex-col font-mono selection:bg-red-600 selection:text-white">
      
      {/* Top Status Bar */}
      <div className="h-16 border-b border-white/10 flex justify-between items-center px-8 bg-black">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
               <span className="text-xs font-bold tracking-[0.3em] text-red-600">ON AIR</span>
            </div>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex items-center gap-2 text-gray-500">
               <Radio size={14} />
               <span className="text-[10px] font-bold uppercase tracking-widest">Channel 01: Stage Management</span>
            </div>
         </div>
         
         <div className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-tighter">
            {time.toLocaleTimeString([], { hour12: false })}
         </div>

         <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all group">
            <X size={20} className="text-gray-500 group-hover:text-white" />
         </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
         
         {/* Main Control Panel: Current Segment */}
         <div className="flex-1 p-8 lg:p-16 flex flex-col justify-between border-r border-white/10 relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#1a1a1a_0%,#0a0a0a_100%)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
               <div className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-1000 ease-linear" style={{ width: isRunning ? '100%' : '0%' }}></div>
            </div>

            <div>
               <div className="flex items-center gap-3 mb-6">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-widest">ACTIVE</span>
                  <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">Segment {currentIndex + 1} of {timeline.length}</span>
               </div>
               
               <h1 className="text-6xl lg:text-8xl font-serif font-bold mb-8 leading-none tracking-tight">
                  {currentItem?.title || "EOX"}
               </h1>
               
               <div className="bg-white/5 border border-white/10 p-8 rounded-2xl max-w-3xl">
                  <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Activity size={12} /> Live Cues
                  </div>
                  <p className="text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light italic">
                     "{currentItem?.description}"
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 items-end pt-12">
               <div className="space-y-2">
                  <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Elapsed Time</div>
                  <div className={`text-7xl lg:text-8xl font-bold tracking-tighter ${elapsed > 600 ? 'text-red-500' : 'text-white'}`}>
                     {formatTime(elapsed)}
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Target Duration</div>
                  <div className="text-5xl lg:text-6xl font-bold text-gray-700 tracking-tighter">
                     {currentItem?.duration || '00m'}
                  </div>
               </div>
               <div className="hidden lg:block space-y-4">
                   <div className={`p-4 rounded-xl border flex flex-col gap-2 ${isRunning ? 'bg-red-600/10 border-red-600/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">System Health</span>
                         <span className="text-[10px] font-bold text-green-500">OPTIMAL</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-green-500 w-full"></div>
                      </div>
                   </div>
               </div>
            </div>
         </div>

         {/* Sidebar: Queue & Strategic Controls */}
         <div className="w-full lg:w-96 flex flex-col bg-[#050505]">
            
            <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
               <div className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-8 flex justify-between items-center">
                  <span>Up Next</span>
                  <span>{timeline.length - currentIndex - 1} remaining</span>
               </div>
               
               <div className="space-y-4">
                  {nextItem ? (
                     <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative group hover:bg-white/[0.08] transition-all cursor-pointer overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-600/50"></div>
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{nextItem.title}</h3>
                           <span className="text-xs font-bold text-gray-500">{nextItem.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{nextItem.description}</p>
                     </div>
                  ) : (
                     <div className="py-20 flex flex-col items-center justify-center text-center opacity-30">
                        <div className="w-12 h-12 rounded-full border border-dashed border-white/50 flex items-center justify-center mb-4">
                           <SkipForward size={24} />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest">End of Run</p>
                        <button 
                          onClick={handleWrapShow}
                          disabled={isFinishing}
                          className="mt-6 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-green-700 transition-all"
                        >
                          {isFinishing ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />} 
                          Wrap Production
                        </button>
                     </div>
                  )}
                  
                  {timeline.slice(currentIndex + 2, currentIndex + 5).map((item, idx) => (
                     <div key={item.id} className="p-4 rounded-xl border border-white/5 bg-transparent opacity-20 hover:opacity-40 transition-opacity">
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-bold truncate pr-4">{item.title}</span>
                           <span className="text-[10px] text-gray-500">{item.time}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="p-8 space-y-4 bg-black border-t border-white/10">
               <div className="flex gap-4">
                  <button 
                     onClick={() => setIsRunning(!isRunning)}
                     className={`flex-1 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${isRunning ? 'bg-yellow-500 text-black hover:bg-yellow-400 ring-4 ring-yellow-500/20' : 'bg-red-600 text-white hover:bg-red-500 ring-4 ring-red-600/20'}`}
                  >
                     {isRunning ? <><Pause size={18} fill="currentColor" /> PAUSE</> : <><Play size={18} fill="currentColor" /> START</>}
                  </button>
               </div>
               
               <button 
                  onClick={handleNext}
                  className="w-full py-5 bg-white text-black hover:bg-gray-200 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95"
               >
                  NEXT SEGMENT <SkipForward size={18} />
               </button>

               <div className="text-center pt-2">
                  <p className="text-[9px] text-gray-600 tracking-widest uppercase">Hotkeys: Space (Pause), N (Next)</p>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};
