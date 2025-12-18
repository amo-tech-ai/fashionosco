
import React from 'react';
import { 
  Mail, FileCheck, Calendar, Eye, 
  AlertCircle, Sparkles, ArrowUpRight, MoreHorizontal 
} from 'lucide-react';
import { SalesActivityEvent, SalesEventType } from '../../types/sales';

interface SalesActivityFeedProps {
  events: SalesActivityEvent[];
}

const EventIcon = ({ type }: { type: SalesEventType }) => {
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
    <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm h-full flex flex-col">
      <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]/50">
        <div>
           <h3 className="font-serif text-2xl text-black">Pipeline Intel</h3>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">Live Momentum Stream</p>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <MoreHorizontal size={18} className="text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {events.length === 0 ? (
          <div className="p-12 text-center text-gray-300 italic text-sm font-light">
            Awaiting signal ingestion...
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {events.map((event) => (
              <div 
                key={event.id} 
                className={`p-6 hover:bg-[#FDFCFB] transition-all group relative ${event.isHighPriority ? 'bg-red-50/10' : ''}`}
              >
                {event.isHighPriority && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                )}
                
                <div className="flex gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${event.isHighPriority ? 'bg-white border-red-100 shadow-sm' : 'bg-gray-50 border-transparent'}`}>
                    <EventIcon type={event.type} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm text-black truncate pr-4">{event.title}</h4>
                      <span className="text-[9px] font-mono font-bold text-gray-300 whitespace-nowrap">{event.timestamp}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                       <span className="text-[9px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">{event.clientName}</span>
                       <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                       <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{event.type.replace('_', ' ')}</span>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed font-light italic border-l-2 border-gray-100 pl-3">
                      "{event.description}"
                    </p>

                    <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                       <button className="text-[9px] font-black uppercase tracking-[0.2em] text-black flex items-center gap-1.5 hover:underline decoration-red-500 underline-offset-4">
                          Deep Audit <ArrowUpRight size={10} />
                       </button>
                       {event.type === 'ai_alert' && (
                         <button className="text-[9px] font-black uppercase tracking-[0.2em] text-red-600 flex items-center gap-1.5 animate-pulse">
                            Deploy Counter-Strategy
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

      <div className="p-6 bg-gray-50/50 border-t border-gray-100">
        <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black hover:border-black transition-all">
          View Master Intelligence Log
        </button>
      </div>
    </div>
  );
};
