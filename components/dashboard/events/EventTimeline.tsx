import React, { useState, useEffect, useRef } from 'react';
import { Plus, Clock, MoreHorizontal, GripVertical, CheckCircle2, Play, Sparkles, Loader2, FileText, Trash2, Send } from 'lucide-react';
import { TimelineItem } from '../../../types/event-tools';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { CampaignService } from '../../../services/data/campaigns';
import { useToast } from '../../ToastProvider';
import { LiveShowMode } from './LiveShowMode';
import { generateEventSchedule } from '../../../services/ai/eventSchedule';
import { generateEventSchedulePDF } from '../../../services/pdf/eventSchedule';

export const EventTimeline: React.FC = () => {
  const { activeCampaign, refreshCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [refinement, setRefinement] = useState('');

  useEffect(() => {
    if (activeCampaign?.data?.timeline) {
      setItems(activeCampaign.data.timeline);
    } else {
      setItems([]);
    }
  }, [activeCampaign?.id, activeCampaign?.data?.timeline]);

  const saveTimeline = async (newItems: TimelineItem[]) => {
    // Optimistic Update
    setItems(newItems);
    if (activeCampaign) {
      try {
        const updatedData = { ...activeCampaign.data, timeline: newItems };
        await CampaignService.update(activeCampaign.id, { data: updatedData });
      } catch (e) {
        console.error("Failed to save timeline", e);
        addToast("Sync error. Please refresh.", "error");
      }
    }
  };

  const handleAddItem = () => {
    const lastItem = items[items.length - 1];
    const newItem: TimelineItem = {
      id: Date.now().toString(),
      time: lastItem ? lastItem.time : '18:00',
      duration: '15m',
      title: 'New Segment',
      description: 'Add department notes...',
      category: 'logistics',
      status: 'pending'
    };
    saveTimeline([...items, newItem]);
    addToast("Segment added", "info");
  };

  const handleGenerateAI = async (isRefinement = false) => {
    if (!activeCampaign) return;
    setIsGenerating(true);
    try {
        const generated = await generateEventSchedule(
            activeCampaign.title || 'Fashion Event',
            activeCampaign.data?.guestCount || 100,
            '19:00',
            isRefinement ? refinement : undefined,
            isRefinement ? items : undefined
        );
        saveTimeline(generated);
        if (isRefinement) {
          setRefinement('');
          addToast("AI Refinement applied", "success");
        } else {
          addToast("Run of Show generated", "success");
        }
    } catch (e) {
        addToast("AI action failed", "error");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newItems = [...items];
    const [movedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, movedItem);
    
    saveTimeline(newItems);
    setDraggedIndex(null);
  };

  const handleStatusToggle = (id: string) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, status: item.status === 'confirmed' ? 'pending' : 'confirmed' } : item
    ) as TimelineItem[];
    saveTimeline(updated);
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'runway': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'hospitality': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'media': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-gray-400 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {isLiveMode && <LiveShowMode timeline={items} onClose={() => { setIsLiveMode(false); refreshCampaign(); }} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
           <div className="bg-black text-white p-3 rounded-xl shadow-lg">
              <Clock size={24} strokeWidth={1.5} />
           </div>
           <div>
              <h2 className="font-serif text-2xl text-[#1A1A1A]">Run of Show</h2>
              <p className="text-sm text-gray-500">Live production timeline & department cues.</p>
           </div>
        </div>
        <div className="flex gap-2 flex-wrap">
           <button 
             onClick={() => generateEventSchedulePDF(items, activeCampaign?.title || 'Event', 'TBD')}
             className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all"
           >
             <FileText size={14} /> Export PDF
           </button>
           
           <button 
             onClick={() => setIsLiveMode(true)}
             disabled={items.length === 0}
             className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
           >
             <Play size={14} fill="currentColor" /> Go Live
           </button>
           
           <button 
             onClick={handleAddItem}
             className="flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
           >
             <Plus size={14} /> Add
           </button>
        </div>
      </div>

      {items.length > 0 && (
        <div className="bg-white border border-purple-100 rounded-xl p-3 flex gap-3 shadow-sm items-center transition-all focus-within:ring-2 focus-within:ring-purple-200">
          <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
            <Sparkles size={16} />
          </div>
          <input 
            type="text" 
            value={refinement}
            onChange={(e) => setRefinement(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && refinement && handleGenerateAI(true)}
            placeholder="Ask AI to adjust timings or add segments..."
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-gray-400"
          />
          <button 
            onClick={() => handleGenerateAI(true)}
            disabled={!refinement || isGenerating}
            className="text-purple-600 hover:text-purple-800 disabled:opacity-50 px-2"
          >
            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      )}

      <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
        {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center px-6">
                <Clock size={32} className="text-gray-200 mb-4" />
                <h3 className="font-serif text-xl mb-2 text-gray-900">Your schedule is empty</h3>
                <p className="text-sm text-gray-500 max-w-xs mb-8">Use AI to generate a detailed production schedule for your event.</p>
                <button 
                  onClick={() => handleGenerateAI(false)} 
                  disabled={isGenerating}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-purple-700 transition-all flex items-center gap-2"
                >
                  {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} 
                  Generate Schedule
                </button>
            </div>
        ) : (
            <div className="divide-y divide-gray-50">
               {items.map((item, index) => (
                  <div 
                    key={item.id} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`group flex items-start gap-4 p-5 hover:bg-[#F7F7F5] transition-all relative ${draggedIndex === index ? 'opacity-30 border-2 border-dashed border-purple-200' : ''}`}
                  >
                     <div className="w-20 shrink-0">
                        <div className="font-mono text-base font-bold text-[#1A1A1A]">{item.time}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{item.duration}</div>
                     </div>

                     <div className="flex flex-col items-center self-stretch w-4 pt-1">
                        <div 
                          onClick={() => handleStatusToggle(item.id)}
                          className={`w-3.5 h-3.5 rounded-full border-2 cursor-pointer z-10 transition-all ${
                            item.status === 'confirmed' ? 'bg-green-500 border-green-500 shadow-sm' : 'bg-white border-gray-200 hover:border-black'
                          }`}
                        ></div>
                        {index !== items.length - 1 && <div className="w-px bg-gray-100 flex-1 my-1"></div>}
                     </div>

                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                           <h4 className="font-bold text-[#1A1A1A] truncate">{item.title}</h4>
                           <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border shrink-0 ${getCategoryColor(item.category)}`}>
                             {item.category}
                           </span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed font-light">{item.description}</p>
                     </div>

                     <div className="self-center text-gray-200 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 p-2">
                        <GripVertical size={16} />
                     </div>
                  </div>
               ))}
            </div>
        )}
      </div>
    </div>
  );
};