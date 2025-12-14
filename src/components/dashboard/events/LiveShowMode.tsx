
import React, { useState, useEffect } from 'react';
import { X, Play, Pause, ChevronRight, Clock, SkipForward } from 'lucide-react';
import { TimelineItem } from '../../../types/event-tools';

interface LiveShowModeProps {
  timeline: TimelineItem[];
  onClose: () => void;
}

export const LiveShowMode: React.FC<LiveShowModeProps> = ({ timeline, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [time, setTime] = useState(new Date());

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
      setIsRunning(false);
    }
  };

  const currentItem = timeline[currentIndex];
  const nextItem = timeline[currentIndex + 1];

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col">
      
      {/* Header */}
      <div className="h-20 border-b border-gray-800 flex justify-between items-center px-8">
         <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span className="font-mono text-xl font-bold tracking-widest text-red-500">LIVE SHOW MODE</span>
         </div>
         <div className="font-mono text-4xl font-bold">
            {time.toLocaleTimeString([], { hour12: false })}
         </div>
         <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
         </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3">
         
         {/* Main View: Current Segment */}
         <div className="lg:col-span-2 p-12 flex flex-col justify-center border-r border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500 origin-left transition-all duration-1000" style={{ width: isRunning ? '100%' : '0%' }}></div>
            
            <div className="mb-4">
               <span className="text-gray-500 font-bold text-sm uppercase tracking-[0.3em]">Now Active</span>
            </div>
            
            <h1 className="text-7xl font-bold mb-6 font-serif leading-tight">
               {currentItem?.title || "End of Show"}
            </h1>
            
            <p className="text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
               {currentItem?.description}
            </p>

            <div className="flex items-center gap-12">
               <div>
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Segment Timer</div>
                  <div className={`font-mono text-6xl ${elapsed > 600 ? 'text-red-500' : 'text-white'}`}>
                     {formatTime(elapsed)}
                  </div>
               </div>
               <div>
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Scheduled</div>
                  <div className="font-mono text-6xl text-gray-600">
                     {currentItem?.duration || '00m'}
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar: Queue & Controls */}
         <div className="flex flex-col bg-[#111111]">
            
            {/* Next Up */}
            <div className="flex-1 p-8 border-b border-gray-800">
               <div className="text-gray-500 font-bold text-xs uppercase tracking-[0.3em] mb-6">Up Next</div>
               {nextItem ? (
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 opacity-70">
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold">{nextItem.title}</h3>
                        <span className="font-mono text-sm text-gray-400">{nextItem.time}</span>
                     </div>
                     <p className="text-gray-400 text-sm">{nextItem.description}</p>
                  </div>
               ) : (
                  <div className="text-gray-500 italic">End of Timeline</div>
               )}
            </div>

            {/* Controls */}
            <div className="p-8 space-y-4">
               <button 
                  onClick={() => setIsRunning(!isRunning)}
                  className={`w-full py-6 rounded-xl font-bold text-xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${isRunning ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-green-600 text-white hover:bg-green-500'}`}
               >
                  {isRunning ? <><Pause fill="currentColor" /> Pause</> : <><Play fill="currentColor" /> Resume</>}
               </button>
               
               <button 
                  onClick={handleNext}
                  className="w-full py-6 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
               >
                  Next Segment <SkipForward fill="currentColor" />
               </button>
            </div>
         </div>

      </div>
    </div>
  );
};
