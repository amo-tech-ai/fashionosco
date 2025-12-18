import React from 'react';
import { 
  Mail, 
  FileCheck, 
  Calendar, 
  Eye, 
  AlertCircle, 
  Sparkles, 
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import { SalesActivityEvent, SalesEventType } from '../../../types/sales';

interface SalesActivityFeedProps {
  events: SalesActivityEvent[];
}

const EventIcon = ({ type, priority }: { type: SalesEventType, priority: boolean }) => {
  switch (type) {
    case 'email_received': return <Mail size={14} className="text-blue-500" />;
    case 'contract_signed': return <FileCheck size={14} className="text-green-500" />;
    case 'meeting_scheduled': return <Calendar size={14} className="text-orange-500" />;
    case 'proposal_viewed': return <Eye size={14} className="text-purple-500" />;
    case 'ai_alert': return <Sparkles size={14} className="text-red-500" />;
    default: return <AlertCircle size={14} className="text-gray-400" />;
  }
};

export const SalesActivityFeed: React.FC<SalesActivityFeedProps> = ({ events }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm h-full flex flex-col">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]">
        <h3 className="font-serif text-xl text-black">Pipeline Intelligence</h3>
        <button className="text-gray-400 hover:text-black transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {events.length === 0 ? (
          <div className="p-12 text-center text-gray-400 italic text-sm">
            No recent activity detected.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {events.map((event) => (
              <div 
                key={event.id} 
                className={`p-6 hover:bg-[#FDFCFB] transition-colors group relative ${event.isHighPriority ? 'bg-red-50/20' : ''}`}
              >
                {event.isHighPriority && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-500"></div>
                )}
                
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${event.isHighPriority ? 'bg-white border-red-100 shadow-sm' : 'bg-gray-50 border-transparent'}`}>
                    <EventIcon type={event.type} priority={event.isHighPriority} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm text-black truncate pr-4">{event.title}</h4>
                      <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap">{event.timestamp}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{event.clientName}</span>
                       <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                       <span className="text-[9px] text-gray-500 capitalize">{event.type.replace('_', ' ')}</span>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed font-light line-clamp-2 italic">
                      "{event.description}"
                    </p>

                    <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300">
                       <button className="text-[10px] font-black uppercase tracking-widest text-black flex items-center gap-1 hover:underline">
                          View Details <ArrowUpRight size={10} />
                       </button>
                       {event.type === 'ai_alert' && (
                         <button className="text-[10px] font-black uppercase tracking-widest text-purple-600 flex items-center gap-1 hover:underline">
                            Take Action
                         </button>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-center">
        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
          View All Logs
        </button>
      </div>
    </div>
  );
};