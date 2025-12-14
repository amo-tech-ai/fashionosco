
import React from 'react';
import { Users, Calendar, MapPin, DollarSign, ArrowUpRight, Clock, AlertTriangle } from 'lucide-react';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';

export const EventOverview: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  
  const venue = activeCampaign?.location || 'TBD';
  const date = activeCampaign?.date ? new Date(activeCampaign.date).toLocaleDateString() : 'Date TBD';
  const guests = activeCampaign?.data?.guestCount || 0;
  const budget = activeCampaign?.totalPrice || 0;

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm">
             <div className="flex items-center gap-3 mb-2 text-gray-500">
                <Users size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Expected Guests</span>
             </div>
             <div className="text-3xl font-serif text-[#1A1A1A]">{guests}</div>
             <div className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight size={12} className="mr-1" /> Capacity OK
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm">
             <div className="flex items-center gap-3 mb-2 text-gray-500">
                <Calendar size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Event Date</span>
             </div>
             <div className="text-3xl font-serif text-[#1A1A1A]">{date}</div>
             <div className="text-xs text-gray-400 mt-1">Run of Show Pending</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm">
             <div className="flex items-center gap-3 mb-2 text-gray-500">
                <MapPin size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Venue</span>
             </div>
             <div className="text-xl font-serif text-[#1A1A1A] truncate">{venue}</div>
             <div className="text-xs text-purple-600 mt-1">London, UK</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm">
             <div className="flex items-center gap-3 mb-2 text-gray-500">
                <DollarSign size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Est. Budget</span>
             </div>
             <div className="text-3xl font-serif text-[#1A1A1A]">${budget.toLocaleString()}</div>
             <div className="text-xs text-orange-600 mt-1">Deposit Paid</div>
          </div>
       </div>

       {/* Alert Banner */}
       <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-4">
          <AlertTriangle className="text-orange-600 shrink-0 mt-0.5" size={20} />
          <div>
             <h4 className="font-bold text-orange-900 text-sm">Production Update</h4>
             <p className="text-xs text-orange-800 mt-1">
                Catering preferences form has not been sent to guests yet. We recommend sending it 2 weeks prior (by Oct 14).
             </p>
          </div>
          <button className="ml-auto text-xs font-bold uppercase tracking-widest bg-white text-orange-600 px-4 py-2 rounded border border-orange-200 hover:bg-orange-100">
             Review Actions
          </button>
       </div>
    </div>
  );
};
