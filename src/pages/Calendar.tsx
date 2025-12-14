
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { useCampaigns } from '../hooks/useCampaigns';
import { useNavigate } from 'react-router-dom';

export const Calendar: React.FC = () => {
  const { campaigns } = useCampaigns();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Basic month navigation
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  // Get days in month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 is Sunday

  // Map campaigns to dates
  const getEventsForDay = (day: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return campaigns.filter(c => {
       if (!c.date) return false;
       const cDate = new Date(c.date);
       return cDate.getDate() === targetDate.getDate() && 
              cDate.getMonth() === targetDate.getMonth() && 
              cDate.getFullYear() === targetDate.getFullYear();
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 p-6 md:p-8 overflow-y-auto h-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
         <h1 className="font-serif text-3xl text-[#1A1A1A]">Production Schedule</h1>
         <div className="flex items-center gap-4">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
               <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-md"><ChevronLeft size={16}/></button>
               <span className="px-4 font-bold text-sm w-32 text-center">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
               </span>
               <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-md"><ChevronRight size={16}/></button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg">
               <Filter size={14} /> Filter
            </button>
         </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
         <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
               <div key={d} className="py-3 text-center text-xs font-bold uppercase text-gray-400 tracking-widest">
                  {d}
               </div>
            ))}
         </div>
         
         <div className="grid grid-cols-7 auto-rows-[minmax(120px,1fr)]">
            {/* Empty cells for start padding */}
            {Array.from({ length: startDay }).map((_, i) => (
               <div key={`empty-${i}`} className="border-b border-r border-gray-100 bg-gray-50/30"></div>
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
               const day = i + 1;
               const events = getEventsForDay(day);
               const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

               return (
                  <div key={day} className={`border-b border-r border-gray-100 p-2 relative group hover:bg-gray-50 transition-colors ${isToday ? 'bg-blue-50/30' : ''}`}>
                     <span className={`text-xs font-medium block mb-2 ${isToday ? 'text-blue-600' : 'text-gray-400'}`}>{day}</span>
                     
                     <div className="space-y-1">
                        {events.map(event => (
                           <div 
                              key={event.id}
                              onClick={() => navigate('/dashboard')} // Ideally navigate to specific campaign detail
                              className={`p-1.5 rounded text-[10px] font-medium truncate cursor-pointer border hover:shadow-sm transition-all ${
                                 event.type === 'event' 
                                 ? 'bg-purple-50 text-purple-700 border-purple-100' 
                                 : 'bg-blue-50 text-blue-700 border-blue-100'
                              }`}
                           >
                              {event.title}
                           </div>
                        ))}
                     </div>
                  </div>
               );
            })}
         </div>
      </div>

      {/* Upcoming List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
         {campaigns.slice(0, 3).map(campaign => (
            <div key={campaign.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
               <div className="w-12 h-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-gray-500 uppercase">{new Date(campaign.date || Date.now()).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-lg font-serif font-bold">{new Date(campaign.date || Date.now()).getDate()}</span>
               </div>
               <div>
                  <h4 className="font-bold text-sm mb-1">{campaign.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                     <span className="flex items-center gap-1"><Clock size={12}/> 09:00 AM</span>
                     <span className="flex items-center gap-1"><MapPin size={12}/> {campaign.location || 'Studio'}</span>
                  </div>
               </div>
            </div>
         ))}
      </div>

    </div>
  );
};
