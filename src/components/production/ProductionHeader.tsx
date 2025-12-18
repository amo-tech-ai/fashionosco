
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Maximize2, CloudRain, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EnvironmentalSignals } from '../../types/production';

interface ProductionHeaderProps {
  signals: EnvironmentalSignals;
}

export const ProductionHeader: React.FC<ProductionHeaderProps> = ({ signals }) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Back to Dashboard"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="h-8 w-px bg-gray-100"></div>
        <div>
          <h1 className="font-serif text-xl font-bold text-[#1A1A1A]">Live Production Console</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 flex items-center gap-2">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
             </span>
             Aesthetic Logic Active
          </p>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold font-mono tracking-tighter tabular-nums text-gray-900">
        {time.toLocaleTimeString([], { hour12: false })}
      </div>

      <div className="flex items-center gap-4">
         <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl shadow-sm">
            <CloudRain size={16} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">
              {signals.weather.temp} • {signals.weather.condition}
            </span>
         </div>
         <button className="text-gray-400 hover:text-black transition-colors" aria-label="Fullscreen Mode">
           <Maximize2 size={18} />
         </button>
      </div>
    </header>
  );
};
