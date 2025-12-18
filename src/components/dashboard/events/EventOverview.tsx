
import React from 'react';
import { Users, Calendar, MapPin, DollarSign, ArrowUpRight, Clock, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';

export const EventOverview: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  
  const venue = activeCampaign?.location || 'TBD';
  const dateStr = activeCampaign?.date ? new Date(activeCampaign.date).toLocaleDateString() : 'Date TBD';
  const guests = activeCampaign?.data?.guestCount || 0;
  const budget = activeCampaign?.totalPrice || 0;
  
  const timeline = activeCampaign?.data?.timeline || [];
  const confirmedCount = timeline.filter((t: any) => t.status === 'confirmed').length;
  const readiness = timeline.length > 0 ? Math.round((confirmedCount / timeline.length) * 100) : 0;
  
  // Find next upcoming segment if any
  const nextSegment = timeline.find((t: any) => t.status === 'pending');

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
                <ArrowUpRight size={12} className="mr-1" /> Capacity Verified
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm">
             <div className="flex items-center gap-3 mb-2 text-gray-500">
                <Clock size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Readiness</span>
             </div>
             <div className="text-3xl font-serif text-[#1A1A1A]">{readiness}%</div>
             <div className="text-xs text-purple-600 flex items-center mt-1">
                <CheckCircle2 size={12} className="mr-1" /> {confirmedCount}/{timeline.length} Finalized
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm">
             <div className="flex items-center gap-3 mb-2 text-gray-500">
                <MapPin size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Venue</span>
             </div>
             <div className="text-xl font-serif text-[#1A1A1A] truncate">{venue}</div>
             <div className="text-xs text-gray-400 mt-1">{dateStr}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm">
             <div className="flex items-center gap-3 mb-2 text-gray-500">
                <DollarSign size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Est. Budget</span>
             </div>
             <div className="text-3xl font-serif text-[#1A1A1A]">${budget.toLocaleString()}</div>
             <div className="text-xs text-orange-600 mt-1">50% Deposit Paid</div>
          </div>
       </div>

       {/* Secondary Banner - Context Aware */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {readiness < 100 ? (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 flex items-start gap-4 shadow-sm animate-in slide-in-from-left duration-500">
                <AlertTriangle className="text-orange-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-orange-900 text-sm">Logistics Warning: Unconfirmed Segments</h4>
                  <p className="text-xs text-orange-800 mt-1">
                      You have {timeline.length - confirmedCount} segments requiring technical confirmation. Backstage cues must be set 24h prior.
                  </p>
                </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 flex items-start gap-4 shadow-sm animate-in slide-in-from-left duration-500">
                <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-green-900 text-sm">Production Ready</h4>
                  <p className="text-xs text-green-800 mt-1">
                      All timeline segments and cues have been verified. Call sheets have been distributed to department leads.
                  </p>
                </div>
            </div>
          )}

          {nextSegment && (
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 flex items-center justify-between shadow-sm animate-in slide-in-from-right duration-500">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 text-purple-600 p-2.5 rounded-lg">
                    <Activity size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Next Priority</div>
                    <div className="font-bold text-[#1A1A1A] text-sm">{nextSegment.title}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-mono font-bold">{nextSegment.time}</div>
                  <div className="text-[10px] text-gray-400 uppercase">{nextSegment.duration}</div>
                </div>
            </div>
          )}
       </div>
    </div>
  );
};
