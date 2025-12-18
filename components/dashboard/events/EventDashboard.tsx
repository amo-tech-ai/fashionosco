import React from 'react';
import { EventOverview } from './EventOverview';
import { EventTimeline } from './EventTimeline';
import { GuestList } from './GuestList';
import { ArrowRight, Grid, Users, Clock, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EventDashboardProps {
  campaign: any;
}

export const EventDashboard: React.FC<EventDashboardProps> = ({ campaign }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Visual Header / Alert */}
      <div className="bg-[#111111] text-white rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-[0.3em]">
               <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
               Live Production Mode Ready
            </div>
            <h2 className="font-serif text-3xl md:text-4xl">Ready to execute?</h2>
            <p className="text-gray-400 max-w-md font-light">Your SS25 Runway show is scheduled for 19:00 today. All departments are checked in.</p>
         </div>
         
         <div className="relative z-10 flex gap-4">
            <button 
               onClick={() => navigate('/dashboard/seating')}
               className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 backdrop-blur-md"
            >
               <Grid size={16} /> Seating Chart
            </button>
            <button 
               onClick={() => navigate('/dashboard/timeline')}
               className="bg-white text-black px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl"
            >
               Enter Live Mode <ArrowRight size={16} className="ml-2 inline" />
            </button>
         </div>

         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-purple-900/30 to-transparent pointer-events-none"></div>
      </div>

      <EventOverview />
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10">
        <div className="xl:col-span-8 space-y-8">
           <div className="bg-white border border-gray-200 rounded-3xl p-1 overflow-hidden shadow-sm">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-[#FAF9F6]">
                 <div className="flex items-center gap-3">
                    <Clock size={20} className="text-gray-400" />
                    <h3 className="font-serif text-xl font-bold">Run of Show</h3>
                 </div>
                 <button onClick={() => navigate('/dashboard/timeline')} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Expand Full Timeline</button>
              </div>
              <EventTimeline />
           </div>
        </div>

        <div className="xl:col-span-4 space-y-8">
           <div className="bg-white border border-gray-200 rounded-3xl p-1 overflow-hidden shadow-sm">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-[#FAF9F6]">
                 <div className="flex items-center gap-3">
                    <Users size={20} className="text-gray-400" />
                    <h3 className="font-serif text-xl font-bold">Guest Management</h3>
                 </div>
              </div>
              <GuestList />
           </div>

           {/* AI Logistics Alert */}
           <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                 <Info size={18} />
                 <span className="text-xs font-bold uppercase tracking-widest">Logistics Update</span>
              </div>
              <h4 className="font-bold text-blue-900">Weather Notice for Arrivals</h4>
              <p className="text-sm text-blue-800/80 leading-relaxed">
                 Rain predicted for 18:30. FashionOS suggests deploying the "Awning Team" to the East Entrance and notifying valets.
              </p>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors">
                 Dispatch Alerts
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};