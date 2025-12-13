import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../components/ToastProvider';
import { generateShotList } from '../services/ai/shotList';
import { CampaignService } from '../services/data/campaigns';
import { useActiveCampaign } from '../contexts/ActiveCampaignContext';
import { Shot } from '../types/ai';
import { ShotItem } from '../types/shotlist';

export const useShotList = () => {
  const { activeCampaign, refreshCampaign } = useActiveCampaign();
  const [shots, setShots] = useState<ShotItem[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [copilotInput, setCopilotInput] = useState('');
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);
  const { addToast } = useToast();

  // Load shots from active campaign
  useEffect(() => {
    if (activeCampaign?.data?.shotList) {
      setShots(mapShots(activeCampaign.data.shotList));
    } else {
      setShots([]);
    }
  }, [activeCampaign?.id]); // Only reset when ID changes to avoid loop

  const mapShots = useCallback((aiShots: Shot[], existingShots: ShotItem[] = []): ShotItem[] => {
    return aiShots.map(s => {
      // Preserve existing status if we are re-mapping
      const existing = existingShots.find(e => e.id === s.id);
      if (existing) return existing;
      return {
        ...s,
        status: 'Draft',
        model: 'TBD',
        outfit: 'TBD',
      };
    });
  }, []);

  // Sync to DB
  const saveShots = async (updatedShots: ShotItem[]) => {
    if (!activeCampaign) return;
    
    // Optimistic Update
    setShots(updatedShots);

    try {
      const updatedData = { 
        ...activeCampaign.data, 
        shotList: updatedShots 
      };
      
      await CampaignService.update(activeCampaign.id, { data: updatedData });
      // We don't await refresh here to keep UI snappy, but we trigger it
      refreshCampaign(); 
    } catch (e) {
      console.error("Failed to save shots", e);
      addToast("Failed to save changes", "error");
    }
  };

  // --- Handlers ---

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updated = [...shots];
    const item = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, item);
    
    saveShots(updated);
    setDraggedIndex(null);
  };

  const handleStatusToggle = (id: string) => {
     const updated = shots.map(s => {
        if (s.id === id) {
           const nextStatus: ShotItem['status'] = s.status === 'Draft' ? 'Approved' : s.status === 'Approved' ? 'Shot' : 'Draft';
           return { ...s, status: nextStatus };
        }
        return s;
     });
     saveShots(updated);
  };

  const handlePriorityCycle = (id: string) => {
    const priorities: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];
    const updated = shots.map(s => {
      if (s.id === id) {
        const idx = priorities.indexOf(s.priority);
        const next = priorities[(idx + 1) % 3];
        return { ...s, priority: next };
      }
      return s;
    });
    saveShots(updated);
  };

  const addNewShot = () => {
    const newShot: ShotItem = {
      id: Date.now().toString(),
      name: 'New Shot',
      description: 'Enter description...',
      angle: 'Eye Level',
      lighting: 'Natural',
      props: '-',
      priority: 'Medium',
      status: 'Draft',
      model: 'TBD',
      outfit: 'TBD'
    };
    saveShots([newShot, ...shots]);
    addToast("New shot added", "success");
  };

  const handleCopilotSubmit = async () => {
    if (!copilotInput.trim() || !activeCampaign) return;
    
    setIsCopilotLoading(true);
    try {
      const context = { 
        vibe: activeCampaign.data.vibe || 'editorial', 
        numberOfItems: shots.length + 1, 
        shootType: activeCampaign.type, 
        referenceBrands: activeCampaign.data.referenceBrands || '', 
        turnaround: activeCampaign.data.turnaround || 'standard' 
      };
      
      const updatedAiShots = await generateShotList({
         ...context,
         numberOfItems: shots.length + 1,
         refinement: copilotInput,
         currentShots: shots
      });

      const mergedShots = mapShots(updatedAiShots, shots);
      saveShots(mergedShots);
      setCopilotInput('');
      addToast("AI Copilot added new shot", "success");

    } catch (err) {
      console.error(err);
      addToast("Failed to generate shot", "error");
    } finally {
      setIsCopilotLoading(false);
    }
  };

  return {
    shots,
    draggedIndex,
    copilotInput,
    setCopilotInput,
    isCopilotLoading,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleStatusToggle,
    handlePriorityCycle,
    addNewShot,
    handleCopilotSubmit
  };
};