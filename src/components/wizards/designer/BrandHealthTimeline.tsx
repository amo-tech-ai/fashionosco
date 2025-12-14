
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface TimelineEvent {
  title: string;
  date: string;
  status: 'completed' | 'current' | 'future';
  description: string;
}

interface BrandHealthTimelineProps {
  currentScore?: number;
}

export const BrandHealthTimeline: React.FC<BrandHealthTimelineProps> = ({ currentScore = 0 }) => {
  // Simple projection logic: Aim for 20% improvement, capped at 100
  const projectedScore = Math.min(100, Math.round(currentScore * 1.2));

  const events: TimelineEvent[] = [
    {
      title: "Initial Audit",
      date: "Today",
      status: "completed",
      description: `Baseline score: ${currentScore}/100 based on public digital footprint.`
    },
    {
      title: "Identity Verification",
      date: "In Progress",
      status: "current",
      description: "Confirming aesthetic tags and market positioning."
    },
    {
      title: "Potential Trajectory",
      date: "+3 Months",
      status: "future",
      description: `Estimated score: ${projectedScore}/100 after implementing visual consistency fixes.`
    }
  ];

  return (
    <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 py-2">
      {events.map((event, index) => (
        <div key={index} className="relative pl-8 group cursor-default">
          {/* Node */}
          <div 
            className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
              event.status === 'completed' ? 'bg-green-500 border-green-500' :
              event.status === 'current' ? 'bg-white border-black ring-4 ring-black/5' :
              'bg-white border-gray-300'
            }`}
          >
            {event.status === 'completed' && <CheckCircle size={12} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
          </div>

          <div className={`${event.status === 'future' ? 'opacity-50 group-hover:opacity-100 transition-opacity' : ''}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
              {event.date}
            </span>
            <h4 className={`text-sm font-bold ${event.status === 'current' ? 'text-black' : 'text-gray-700'}`}>
              {event.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-xs">
              {event.description}
            </p>
            {event.status === 'future' && (
               <div className="mt-2 text-[10px] text-blue-600 font-bold uppercase tracking-widest flex items-center gap-1 cursor-pointer hover:underline">
                  View Action Plan <ArrowRight size={10} />
               </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
