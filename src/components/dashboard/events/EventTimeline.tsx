
import React, { useState, useEffect } from 'react';
import { Plus, Clock, MoreHorizontal, GripVertical, CheckCircle2, Play, Sparkles, Loader2 } from 'lucide-react';
import { TimelineItem } from '../../../types/event-tools';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { CampaignService } from '../../../services/data/campaigns';
import { useToast } from '../../ToastProvider';
import { LiveShowMode } from './LiveShowMode';
import { generateEventSchedule } from '../../../services/ai/eventSchedule';

export const EventTimeline: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load initial data
  useEffect(() => {
    if (activeCampaign?.data?.timeline) {
      setItems(activeCampaign.data.timeline);
    } else {
      // Empty state initially to encourage generation
      setItems([]);
    }
  }, [activeCampaign?.id]);

  const saveTimeline = async (newItems: TimelineItem[]) => {
    setItems(newItems);
    if (activeCampaign) {
      try {
        const updatedData = { ...activeCampaign.data, timeline: newItems };
        await CampaignService.update(activeCampaign.id, { data: updatedData });
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

  const handleGenerateAI = async () => {
    if (!activeCampaign) return;
    setIsGenerating(true);
    try {
        const generated = await generateEventSchedule(
            activeCampaign.title || 'Fashion Event', // Use title as proxy for type if generic
            activeCampaign.data.guestCount || 100
        );
        saveTimeline(generated);
        addToast("Run of Show generated successfully", "success");
    } catch (e) {
        addToast("Failed to generate timeline", "error");
    } finally {
        setIsGenerating(false);
    }
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1A1A1A]">Run of Show</h2>
          <p className="text-sm text-gray-500">Minute-by-minute production schedule.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setIsLiveMode(true)}
             disabled={items.length === 0}
             className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <Play size={14} fill="currentColor" /> Live Mode
           </button>
           
           <button
             onClick={handleGenerateAI}
             disabled={isGenerating}
             className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-purple-700 transition-colors shadow-sm"
           >
             {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />} 
             AI Generate
           </button>

           <button 
             onClick={handleAddItem}
             className="flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
           >
             <Plus size={14} /> Add
           </button>
        </div>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm overflow-hidden min-h-[200px]">
        {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Clock size={48} className="mb-4 opacity-20" />
                <p>No timeline segments yet.</p>
                <button onClick={handleGenerateAI} className="text-purple-600 font-bold text-sm mt-2 hover:underline">
                    Generate with AI
                </button>
            </div>
        ) : (
            items.map((item, index) => (
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
            ))
        )}
      </div>
    </div>
  );
};
