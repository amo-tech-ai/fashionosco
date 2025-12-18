
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
  const [items, setItems] = useState<any[]>([]);
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

  const saveTimeline = async (newItems: any[]) => {
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

  const handleUpdateField = (id: string, field: string, value: string) => {
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
        // Fix: Cast TimelineItem to any to access cue properties that are added during the enrichment process.
        const cues = generated.map(i => ({
            ...i,
            audioCue: (i as any).audioCue || 'Standard Audio Loop',
            lightingCue: (i as any).lightingCue || 'Full House Wash',
            stageCue: (i as any).stageCue || 'Ready Models'
        }));
        saveTimeline(cues);
        setRefinement('');
        addToast("Run of Show updated", "success");
    } catch (e) {
        addToast("AI action failed", "error");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 pt-6">
        <h2 className="font-serif text-2xl">Timeline Configuration</h2>
        <div className="flex gap-2">
           <button onClick={() => handleGenerateAI(false)} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} /> Re-Generate
           </button>
        </div>
      </div>

      <div className="divide-y divide-gray-50 bg-white">
        {items.map((item, index) => (
          <div key={item.id} className={`p-6 transition-all ${editingId === item.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}>
            <div className="flex items-start gap-4">
              <div className="w-20 shrink-0">
                <input 
                  value={item.time} 
                  onChange={(e) => handleUpdateField(item.id, 'time', e.target.value)}
                  className="font-mono text-base font-bold bg-transparent border-none focus:outline-none w-full"
                />
                <span className="text-[10px] text-gray-400 font-bold uppercase block mt-1">{item.duration}</span>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                   <input 
                      value={item.title}
                      onChange={(e) => handleUpdateField(item.id, 'title', e.target.value)}
                      className="font-bold text-lg bg-transparent border-none focus:outline-none w-full"
                   />
                   <button 
                     onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                     className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${editingId === item.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}
                   >
                     {editingId === item.id ? 'Close Technical' : 'Edit Tech Cues'}
                   </button>
                </div>

                {editingId === item.id && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 flex items-center gap-2">
                          <Volume2 size={12}/> Audio
                       </label>
                       <textarea 
                          value={item.audioCue}
                          onChange={(e) => handleUpdateField(item.id, 'audioCue', e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs focus:border-blue-500 outline-none"
                          rows={2}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-600 flex items-center gap-2">
                          <Zap size={12}/> Lighting
                       </label>
                       <textarea 
                          value={item.lightingCue}
                          onChange={(e) => handleUpdateField(item.id, 'lightingCue', e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs focus:border-yellow-500 outline-none"
                          rows={2}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-600 flex items-center gap-2">
                          <Radio size={12}/> Stage
                       </label>
                       <textarea 
                          value={item.stageCue}
                          onChange={(e) => handleUpdateField(item.id, 'stageCue', e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg p-3 text-xs focus:border-purple-500 outline-none"
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
    </div>
  );
};
