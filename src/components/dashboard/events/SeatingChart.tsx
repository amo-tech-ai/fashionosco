
import React, { useState, useEffect, useCallback } from 'react';
import { User, GripVertical, Plus, Save, Trash2, Share2, Users as UsersIcon } from 'lucide-react';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { CampaignService } from '../../../services/data/campaigns';
import { SeatingService, Table } from '../../../services/data/seating';
import { useToast } from '../../ToastProvider';
import { supabase } from '../../../lib/supabase';

export const SeatingChart: React.FC = () => {
  const { activeCampaign, refreshCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  
  const [guests, setGuests] = useState<any[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedGuest, setDraggedGuest] = useState<any>(null);
  const [activeUsers, setActiveUsers] = useState<number>(1);

  // Load Data & Subscribe to Realtime
  useEffect(() => {
    if (!activeCampaign) return;

    if (activeCampaign.data?.seatingChart?.tables) {
        setTables(activeCampaign.data.seatingChart.tables);
    } else {
        setTables([
            { id: 't1', name: 'FROW - SECTION A', type: 'rect', seats: Array(10).fill(null).map((_, i) => ({ id: `t1-s${i}` })), x: 50, y: 50 },
            { id: 't2', name: 'FROW - SECTION B', type: 'rect', seats: Array(10).fill(null).map((_, i) => ({ id: `t2-s${i}` })), x: 450, y: 50 }
        ]);
    }

    if (activeCampaign.data?.guests) {
        setGuests(activeCampaign.data.guests);
    }

    // Realtime Sync Channel
    const channel = supabase.channel(`seating_sync:${activeCampaign.id}`)
      .on('broadcast', { event: 'tables_updated' }, ({ payload }: any) => {
        setTables(payload.tables);
        setHasChanges(false); 
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setActiveUsers(Object.keys(state).length);
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ user: 'producer', online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeCampaign?.id]);

  const broadcastUpdate = useCallback((newTables: Table[]) => {
    if (!activeCampaign) return;
    supabase.channel(`seating_sync:${activeCampaign.id}`).send({
      type: 'broadcast',
      event: 'tables_updated',
      payload: { tables: newTables }
    });
  }, [activeCampaign]);

  const handleDragStart = (e: React.DragEvent, guest: any) => {
    setDraggedGuest(guest);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = (e: React.DragEvent, tableId: string, seatIndex: number) => {
    e.preventDefault();
    if (!draggedGuest) return;

    const newTables = tables.map(t => {
      if (t.id === tableId) {
        const newSeats = [...t.seats];
        newSeats[seatIndex] = { 
          ...newSeats[seatIndex], 
          guestId: draggedGuest.id, 
          guestName: draggedGuest.name 
        };
        return { ...t, seats: newSeats };
      }
      return t;
    });
    
    setTables(newTables);
    setHasChanges(true);
    setDraggedGuest(null);
    broadcastUpdate(newTables);
  };

  const handleRemoveGuestFromSeat = (tableId: string, seatIndex: number) => {
     const newTables = tables.map(t => {
        if (t.id === tableId) {
           const newSeats = [...t.seats];
           newSeats[seatIndex] = { ...newSeats[seatIndex], guestId: undefined, guestName: undefined };
           return { ...t, seats: newSeats };
        }
        return t;
     });
     setTables(newTables);
     setHasChanges(true);
     broadcastUpdate(newTables);
  };

  const handleSave = async () => {
      if (!activeCampaign) return;
      try {
          const updatedData = { 
              ...activeCampaign.data, 
              seatingChart: { tables } 
          };
          await CampaignService.update(activeCampaign.id, { data: updatedData });
          setHasChanges(false);
          addToast("Seating Master committed to DB.", "success");
          refreshCampaign();
      } catch (e) {
          addToast("DB Sync failed.", "error");
      }
  };

  return (
    <div className="flex flex-col h-full gap-6 pb-12">
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="font-serif text-3xl text-[#1A1A1A]">Seating Logistics</h2>
          <div className="flex items-center gap-3 mt-1">
             <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                Real-time Sync Active
             </div>
             <span className="text-xs text-gray-400 flex items-center gap-1">
                <UsersIcon size={12} /> {activeUsers} Active Producers
             </span>
          </div>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={handleSave}
                disabled={!hasChanges}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  hasChanges ? 'bg-black text-white shadow-xl' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
                <Save size={14} /> Commit Changes
            </button>
            <button 
                className="flex items-center gap-2 bg-white border border-gray-200 text-[#1A1A1A] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-black transition-all"
            >
                <Plus size={14} /> Add Block
            </button>
        </div>
      </div>

      <div className="flex flex-1 h-[700px] gap-6 overflow-hidden">
        {/* Unassigned Guests */}
        <div className="w-80 bg-white border border-gray-100 rounded-[2rem] flex flex-col overflow-hidden shadow-sm">
           <div className="p-6 border-b border-gray-50 bg-[#F7F7F5]/50">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Assortment</h3>
              <div className="font-serif text-xl">Unassigned Guests</div>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {guests.filter(g => !tables.some(t => t.seats.some(s => s.guestId === g.id))).length === 0 && (
                <div className="text-center py-12 text-gray-400 italic text-sm font-light">
                   All guests seated.
                </div>
              )}
              {guests.filter(g => !tables.some(t => t.seats.some(s => s.guestId === g.id))).map(guest => (
                 <div 
                    key={guest.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, guest)}
                    className="p-4 bg-gray-50 border border-gray-100 rounded-2xl cursor-grab hover:border-black hover:bg-white transition-all flex items-center gap-3 group shadow-sm active:cursor-grabbing"
                 >
                    <GripVertical size={14} className="text-gray-300 group-hover:text-black" />
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                       {guest.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                       <span className="text-sm font-bold text-gray-900 truncate block">{guest.name}</span>
                       <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{guest.category}</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Floor Plan Canvas */}
        <div className="flex-1 bg-white border border-gray-100 rounded-[3rem] relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] overflow-y-auto shadow-inner custom-scrollbar">
           <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl z-10">
              Catwalk Stage Direction
           </div>

           <div className="p-20 flex flex-col items-center gap-20">
              {tables.map(table => (
                 <div 
                    key={table.id}
                    className="bg-white border border-gray-200 rounded-[2rem] shadow-xl p-8 flex flex-col items-center transition-all hover:shadow-2xl cursor-default group relative min-w-[500px]"
                 >
                    <div className="absolute -top-3 left-8 bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                       {table.name}
                    </div>
                    
                    <div className="grid grid-cols-5 gap-3 w-full">
                       {table.seats.map((seat, idx) => (
                          <div 
                             key={idx}
                             onDragOver={(e) => e.preventDefault()}
                             onDrop={(e) => handleDrop(e, table.id, idx)}
                             className={`
                                aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all relative group/seat
                                ${seat.guestName 
                                   ? 'bg-black border-black text-white shadow-lg' 
                                   : 'bg-gray-50 border-dashed border-gray-200 text-gray-300 hover:border-purple-400 hover:bg-purple-50'
                                }
                             `}
                          >
                             {seat.guestName ? (
                                <>
                                   <div className="text-[8px] font-black uppercase tracking-tighter text-gray-400 mb-0.5">Seat {idx + 1}</div>
                                   <span className="font-bold text-[10px] text-center px-1 truncate w-full">{seat.guestName}</span>
                                   <button 
                                      onClick={() => handleRemoveGuestFromSeat(table.id, idx)}
                                      className="absolute inset-0 bg-red-600 text-white flex items-center justify-center opacity-0 group-hover/seat:opacity-100 transition-all rounded-2xl scale-90 group-hover/seat:scale-100"
                                   >
                                      <Trash2 size={16} />
                                   </button>
                                </>
                             ) : (
                                <span className="text-[10px] font-bold opacity-30">{idx + 1}</span>
                             )}
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
