
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Mail, Ticket, Check } from 'lucide-react';
import { Guest } from '../../../types/event-tools';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { CampaignService } from '../../../services/data/campaigns';
import { useToast } from '../../ToastProvider';

export const GuestList: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (activeCampaign?.data?.guests) {
      setGuests(activeCampaign.data.guests);
    } else {
      // Mock Data
      setGuests([
        { id: '1', name: 'Anna Wintour', email: 'anna@vogue.com', category: 'Press', status: 'Confirmed', plusOne: true, assignedSeat: 'A-01' },
        { id: '2', name: 'Edward Enninful', email: 'edward@vogue.co.uk', category: 'Press', status: 'Invited', plusOne: true, assignedSeat: 'A-02' },
        { id: '3', name: 'Bella Hadid', email: 'agent@imgmodels.com', category: 'VIP', status: 'Confirmed', plusOne: false },
        { id: '4', name: 'Buyer - Selfridges', email: 'buying@selfridges.com', category: 'Buyer', status: 'Waitlist', plusOne: false },
      ]);
    }
  }, [activeCampaign?.id]);

  const saveGuests = async (newGuests: Guest[]) => {
    setGuests(newGuests);
    if (activeCampaign) {
      const updatedData = { ...activeCampaign.data, guests: newGuests };
      await CampaignService.update(activeCampaign.id, { data: updatedData });
    }
  };

  const handleAddGuest = () => {
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: 'New Guest',
      email: '',
      category: 'General',
      status: 'Invited',
      plusOne: false
    };
    saveGuests([...guests, newGuest]);
    addToast("Guest added to list", "success");
  };

  const filteredGuests = guests.filter(g => filter === 'All' || g.status === filter || g.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1A1A1A]">Guest List</h2>
          <p className="text-sm text-gray-500">Manage RSVPs, seating, and accreditation.</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
           <div className="relative flex-1 md:flex-none">
              <Search size={14} className="absolute left-3 top-3 text-gray-400" />
              <input 
                 type="text" 
                 placeholder="Search guests..." 
                 className="pl-9 pr-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm w-full md:w-64 focus:outline-none focus:border-black transition-colors"
              />
           </div>
           <button 
              onClick={handleAddGuest}
              className="bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2 whitespace-nowrap"
           >
              <Plus size={14} /> Add Guest
           </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
         {['All', 'Confirmed', 'Invited', 'VIP', 'Press', 'Buyer'].map(f => (
            <button 
               key={f} 
               onClick={() => setFilter(f)}
               className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${filter === f ? 'bg-[#1A1A1A] text-white' : 'bg-white border border-[#E5E5E5] text-gray-500 hover:border-black hover:text-black'}`}
            >
               {f}
            </button>
         ))}
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead className="bg-[#F7F7F5] border-b border-[#E5E5E5]">
               <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Category</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Seat</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
               {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="group hover:bg-gray-50 transition-colors">
                     <td className="px-6 py-4">
                        <div className="font-bold text-[#1A1A1A]">{guest.name}</div>
                        <div className="text-xs text-gray-500">{guest.email}</div>
                     </td>
                     <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                           guest.category === 'Press' ? 'bg-blue-50 text-blue-700' :
                           guest.category === 'VIP' ? 'bg-purple-50 text-purple-700' :
                           guest.category === 'Buyer' ? 'bg-green-50 text-green-700' :
                           'bg-gray-100 text-gray-600'
                        }`}>
                           {guest.category}
                        </span>
                     </td>
                     <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                           guest.status === 'Confirmed' ? 'text-green-600' :
                           guest.status === 'Invited' ? 'text-orange-500' :
                           'text-gray-500'
                        }`}>
                           {guest.status === 'Confirmed' && <Check size={12} />}
                           {guest.status}
                        </span>
                     </td>
                     <td className="px-6 py-4 font-mono text-sm text-gray-600">
                        {guest.assignedSeat || '-'}
                     </td>
                     <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 hover:bg-gray-200 rounded text-gray-500" title="Send Invite">
                              <Mail size={16} />
                           </button>
                           <button className="p-2 hover:bg-gray-200 rounded text-gray-500" title="Manage Ticket">
                              <Ticket size={16} />
                           </button>
                           <button className="p-2 hover:bg-gray-200 rounded text-gray-500">
                              <MoreHorizontal size={16} />
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         {filteredGuests.length === 0 && (
            <div className="p-8 text-center text-gray-400 text-sm">
               No guests found matching this filter.
            </div>
         )}
      </div>
    </div>
  );
};
