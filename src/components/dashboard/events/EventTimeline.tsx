
import React, { useState, useEffect } from 'react';
import { Plus, Clock, GripVertical, CheckCircle2, Sparkles, Loader2, FileText, Trash2, Send, Zap, Volume2, Radio } from 'lucide-react';
import { TimelineItem } from '../../../types/event-tools';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { CampaignService } from '../../../services/data/campaigns';
import { useToast } from '../../ToastProvider';
import { generateEventSchedule } from '../../../services/ai/eventSchedule';
import { generateEventSchedulePDF } from '../../../services/pdf/eventSchedule';

export const EventTimeline: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [refinement, setRefinement] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (activeCampaign?.data?.timeline) {
      setItems(activeCampaign.data.timeline);
    } else {
      setItems([]);
    }
  }, [activeCampaign?.id, activeCampaign?.data?.timeline]);

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

  const handleUpdateField = (id: string, field: keyof TimelineItem, value: string) => {
    const updated = items.map(item => item.id === id ? { ...item, [field]: value } : item);
    saveTimeline(updated);
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
        
        // Enrich generated items with tech cue defaults
        const cues: TimelineItem[] = generated.map(i => ({
            ...i,
            audioCue: i.audioCue || 'Atmospheric Loop',
            lightingCue: i.lightingCue || 'Standard House LX',
            stageCue: i.stageCue || 'Models Ready at Stage Left'
        }));
        
        saveTimeline(cues);
        setRefinement('');
        addToast(isRefinement ? "Schedule refined" : "Run of Show generated", "success");
    } catch (e) {
        addToast("AI action failed", "error");
    } finally {
        setIsGenerating(false);
    }
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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 pt-6">
        <h2 className="font-serif text-2xl">Timeline Configuration</h2>
        <div className="flex gap-2">
           <button onClick={() => handleGenerateAI(false)} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-purple-700 transition-all">
              <Sparkles size={14} /> AI Generation
           </button>
        </div>
      </div>

      <div className="divide-y divide-gray-50 bg-white">
        {items.map((item) => (
          <div key={item.id} className={`p-6 transition-all ${editingId === item.id ? 'bg-[#F9F9F9]' : 'hover:bg-gray-50/50'}`}>
            <div className="flex items-start gap-6">
              <div className="w-20 shrink-0">
                <input 
                  value={item.time} 
                  onChange={(e) => handleUpdateField(item.id, 'time', e.target.value)}
                  className="font-mono text-base font-bold bg-transparent border-none focus:outline-none w-full"
                />
                <span className="text-[10px] text-gray-400 font-bold uppercase block mt-1">{item.duration}</span>
              </div>
              
              <div className="flex-1 space-y-4 min-w-0">
                <div className="flex justify-between items-start gap-4">
                   <div className="flex-1">
                      <input 
                          value={item.title}
                          onChange={(e) => handleUpdateField(item.id, 'title', e.target.value)}
                          className="font-bold text-lg bg-transparent border-none focus:outline-none w-full mb-1"
                      />
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                   </div>
                   <button 
                     onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                     className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${editingId === item.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-200'}`}
                   >
                     {editingId === item.id ? 'Close Tech' : 'Technical Cues'}
                   </button>
                </div>

                {editingId === item.id && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 flex items-center gap-2">
                          <Volume2 size={12}/> Audio Cue
                       </label>
                       <textarea 
                          value={item.audioCue || ''}
                          onChange={(e) => handleUpdateField(item.id, 'audioCue', e.target.value)}
                          placeholder="e.g. Trigger 'Ambient Noir' loop B"
                          className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs focus:border-blue-500 outline-none shadow-sm"
                          rows={2}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-600 flex items-center gap-2">
                          <Zap size={12}/> Lighting Rig
                       </label>
                       <textarea 
                          value={item.lightingCue || ''}
                          onChange={(e) => handleUpdateField(item.id, 'lightingCue', e.target.value)}
                          placeholder="e.g. Fade house to 10%, Blue Wash 20%"
                          className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs focus:border-yellow-500 outline-none shadow-sm"
                          rows={2}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-600 flex items-center gap-2">
                          <Radio size={12}/> Stage Management
                       </label>
                       <textarea 
                          value={item.stageCue || ''}
                          onChange={(e) => handleUpdateField(item.id, 'stageCue', e.target.value)}
                          placeholder="e.g. Model 1 release from Stage Left"
                          className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs focus:border-purple-500 outline-none shadow-sm"
                          rows={2}
                       />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {isGenerating && (
        <div className="p-12 flex flex-col items-center justify-center text-gray-400 bg-white rounded-3xl border border-gray-100">
           <Loader2 className="animate-spin mb-4" />
           <p className="text-xs font-bold uppercase tracking-widest">Consulting Show Producer...</p>
        </div>
      )}
    </div>
  );
};
