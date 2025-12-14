
import React, { useState, useEffect } from 'react';
import { Plus, Clock, MoreHorizontal, GripVertical, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import { TimelineItem } from '../../../types/event-tools';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { CampaignService } from '../../../services/data/campaigns';
import { useToast } from '../../ToastProvider';
import { LiveShowMode } from './LiveShowMode';

export const EventTimeline: React.FC = () => {
  const { activeCampaign, refreshCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Load initial data
  useEffect(() => {
    if (activeCampaign?.data?.timeline) {
      setItems(activeCampaign.data.timeline);
    } else {
      // Default Template
      setItems([
        { id: '1', time: '18:00', duration: '60m', title: 'Load In & Setup', description: 'Audio/Lighting checks, catering prep.', category: 'logistics', status: 'confirmed' },
        { id: '2', time: '19:00', duration: '30m', title: 'Doors Open', description: 'Check-in scanning, welcome drinks.', category: 'hospitality', status: 'confirmed' },
        { id: '3', time: '19:45', duration: '15m', title: 'Seating Call', description: 'Ushers guide VIPs to Front Row.', category: 'logistics', status: 'pending' },
        { id: '4', time: '20:00', duration: '20m', title: 'Runway Show', description: 'Music cue, 24 looks.', category: 'runway', status: 'pending' },
        { id: '5', time: '20:30', duration: '60m', title: 'After Party', description: 'DJ set, open bar.', category: 'hospitality', status: 'pending' }
      ]);
    }
  }, [activeCampaign?.id]);

  const saveTimeline = async (newItems: TimelineItem[]) => {
    setItems(newItems);
    if (activeCampaign) {
      try {
        const updatedData = { ...activeCampaign.data, timeline: newItems };
        await CampaignService.update(activeCampaign.id, { data: updatedData });
        // Silent update, no toast needed for every small change
      } catch (e) {
        console.error("Failed to save timeline", e);
      }
    }
  };

  const handleAddItem = () => {
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      time: '00:00',
      duration: '15m',
      title: 'New Segment',
      description: '',
      category: 'logistics',
      status: 'pending'
    };
    saveTimeline([...items, newItem]);
  };

  const handleStatusToggle = (id: string) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, status: item.status === 'confirmed' ? 'pending' : 'confirmed' } : item
    ) as TimelineItem[];
    saveTimeline(updated);
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'runway': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'hospitality': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'media': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {isLiveMode && <LiveShowMode timeline={items} onClose={() => setIsLiveMode(false)} />}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl text-[#1A1A1A]">Run of Show</h2>
          <p className="text-sm text-gray-500">Minute-by-minute production schedule.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setIsLiveMode(true)}
             className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-sm animate-pulse"
           >
             <Play size={14} fill="currentColor" /> Launch Live Mode
           </button>
           <button 
             onClick={handleAddItem}
             className="flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
           >
             <Plus size={14} /> Add Segment
           </button>
        </div>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm overflow-hidden">
        {items.map((item, index) => (
          <div key={item.id} className="group flex items-start gap-4 p-4 border-b border-[#E5E5E5] last:border-0 hover:bg-[#F7F7F5] transition-colors relative">
            
            {/* Time Column */}
            <div className="w-24 shrink-0 pt-1">
              <div className="font-mono text-lg font-bold text-[#1A1A1A]">{item.time}</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Clock size={10} /> {item.duration}
              </div>
            </div>

            {/* Timeline Line */}
            <div className="relative flex flex-col items-center self-stretch">
               <div className={`w-3 h-3 rounded-full border-2 z-10 mt-2 ${item.status === 'confirmed' ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}></div>
               {index !== items.length - 1 && <div className="w-0.5 bg-gray-200 flex-1 my-1"></div>}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-1 pb-4">
               <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                     <h3 className="font-bold text-[#1A1A1A]">{item.title}</h3>
                     <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getCategoryColor(item.category)}`}>
                        {item.category}
                     </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => handleStatusToggle(item.id)} className="text-gray-400 hover:text-green-600">
                        {item.status === 'confirmed' ? <CheckCircle2 size={18} className="text-green-600" /> : <CheckCircle2 size={18} />}
                     </button>
                     <button className="text-gray-400 hover:text-[#1A1A1A]">
                        <MoreHorizontal size={18} />
                     </button>
                  </div>
               </div>
               <p className="text-sm text-gray-500">{item.description}</p>
            </div>

            {/* Drag Handle */}
            <div className="self-center text-gray-300 cursor-grab opacity-0 group-hover:opacity-100 p-2">
               <GripVertical size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
