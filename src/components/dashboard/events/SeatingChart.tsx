
import React, { useState } from 'react';
import { User, GripVertical, Plus } from 'lucide-react';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { useToast } from '../../ToastProvider';

interface Seat {
  id: string;
  guestId?: string;
  guestName?: string;
}

interface Table {
  id: string;
  name: string;
  type: 'round' | 'rect';
  seats: Seat[];
  x: number;
  y: number;
}

export const SeatingChart: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  
  // Mock Guest Pool (Usually comes from GuestList)
  const [guests] = useState([
    { id: 'g1', name: 'Anna Wintour' },
    { id: 'g2', name: 'Edward Enninful' },
    { id: 'g3', name: 'Bella Hadid' },
    { id: 'g4', name: 'Gigi Hadid' },
    { id: 'g5', name: 'Donatella Versace' },
    { id: 'g6', name: 'Pierpaolo Piccioli' },
  ]);

  const [tables, setTables] = useState<Table[]>([
    { 
      id: 't1', 
      name: 'Table 1 (VIP)', 
      type: 'round', 
      seats: Array(8).fill(null).map((_, i) => ({ id: `t1-s${i}` })),
      x: 50,
      y: 50
    },
    { 
      id: 't2', 
      name: 'Table 2 (Press)', 
      type: 'rect', 
      seats: Array(10).fill(null).map((_, i) => ({ id: `t2-s${i}` })),
      x: 300,
      y: 50
    }
  ]);

  const [draggedGuest, setDraggedGuest] = useState<any>(null);

  const handleDragStart = (e: React.DragEvent, guest: any) => {
    setDraggedGuest(guest);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = (e: React.DragEvent, tableId: string, seatIndex: number) => {
    e.preventDefault();
    if (!draggedGuest) return;

    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        const newSeats = [...t.seats];
        // Remove guest from other seats if already seated (simplified logic)
        
        newSeats[seatIndex] = { 
          ...newSeats[seatIndex], 
          guestId: draggedGuest.id, 
          guestName: draggedGuest.name 
        };
        return { ...t, seats: newSeats };
      }
      return t;
    }));
    
    addToast(`${draggedGuest.name} seated at ${tables.find(t => t.id === tableId)?.name}`, "success");
    setDraggedGuest(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl text-[#1A1A1A]">Seating Chart</h2>
          <p className="text-sm text-gray-500">Drag and drop guests to assign seats.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors">
           <Plus size={14} /> Add Table
        </button>
      </div>

      <div className="flex flex-1 h-[600px] gap-6 overflow-hidden">
        {/* Sidebar: Guests */}
        <div className="w-64 bg-white border border-[#E5E5E5] rounded-xl flex flex-col overflow-hidden">
           <div className="p-4 border-b border-[#E5E5E5] bg-[#F7F7F5]">
              <h3 className="font-bold text-sm">Unseated Guests</h3>
           </div>
           <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {guests.map(guest => (
                 <div 
                    key={guest.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, guest)}
                    className="p-3 bg-white border border-[#E5E5E5] rounded-lg cursor-grab hover:border-black transition-colors flex items-center gap-2"
                 >
                    <GripVertical size={14} className="text-gray-400" />
                    <User size={14} className="text-gray-600" />
                    <span className="text-sm font-medium">{guest.name}</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Canvas: Floor Plan */}
        <div className="flex-1 bg-[#F7F7F5] border border-[#E5E5E5] rounded-xl relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
           {tables.map(table => (
              <div 
                 key={table.id}
                 className="absolute bg-white border border-gray-300 rounded-xl shadow-sm p-4 flex flex-col items-center"
                 style={{ left: table.x, top: table.y, minWidth: table.type === 'rect' ? '300px' : '200px' }}
              >
                 <div className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-500">{table.name}</div>
                 
                 {/* Seats Grid */}
                 <div className={`grid gap-2 ${table.type === 'round' ? 'grid-cols-2' : 'grid-cols-5'}`}>
                    {table.seats.map((seat, idx) => (
                       <div 
                          key={idx}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, table.id, idx)}
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-[10px] text-center cursor-pointer transition-colors overflow-hidden ${seat.guestName ? 'bg-black border-black text-white' : 'bg-gray-50 border-dashed border-gray-300 text-gray-400 hover:border-black'}`}
                          title={seat.guestName || "Empty Seat"}
                       >
                          {seat.guestName ? (
                             <span className="leading-tight px-1">{seat.guestName.split(' ')[0]}</span>
                          ) : (
                             <span className="opacity-50">{idx + 1}</span>
                          )}
                       </div>
                    ))}
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};
