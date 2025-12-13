
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../components/ToastProvider';
import { generateShotList } from '../services/ai/shotList';
import { Shot } from '../types/ai';
import { ShotItem } from '../types/shotlist';

export const useShotList = () => {
  const [shots, setShots] = useState<ShotItem[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [copilotInput, setCopilotInput] = useState('');
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);
  const { addToast } = useToast();

  // Helper to map AI shots to UI shots
  const mapShots = useCallback((aiShots: Shot[], existingShots: ShotItem[] = []): ShotItem[] => {
    return aiShots.map(s => {
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

  // 1. Initial Load
  useEffect(() => {
    const activeCampaign = localStorage.getItem('active_campaign');
    if (activeCampaign) {
      try {
        const campaignData = JSON.parse(activeCampaign);
        if (campaignData.shotList && campaignData.shotList.length > 0) {
          setShots(mapShots(campaignData.shotList));
          return;
        }
      } catch (e) {
        console.error("Error loading active campaign shots", e);
      }
    }

    // Fallback Mock Data
    setShots([
      { 
        id: '1', name: 'Hero Shot - Beach', description: 'Wide angle establishing shot with natural lighting.', 
        angle: 'Wide', lighting: 'Natural Golden Hour', props: 'Surfboard', priority: 'High',
        status: 'Approved', model: 'Sarah J', outfit: 'Look 01'
      },
      { 
        id: '2', name: 'Detail - Texture', description: 'Close up of fabric details.', 
        angle: 'Macro', lighting: 'Soft Diffused', props: '-', priority: 'Medium',
        status: 'Draft', model: '-', outfit: 'Look 01' 
      }
    ]);
  }, [mapShots]);

  // 2. Persistence
  useEffect(() => {
    if (shots.length === 0) return;
    const activeCampaignStr = localStorage.getItem('active_campaign');
    if (activeCampaignStr) {
      try {
        const campaign = JSON.parse(activeCampaignStr);
        campaign.shotList = shots;
        campaign.lastUpdated = new Date().toISOString();
        localStorage.setItem('active_campaign', JSON.stringify(campaign));
      } catch (e) {
        console.error("Failed to sync shots", e);
      }
    }
  }, [shots]);

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
    
    setShots(updated);
    setDraggedIndex(null);
  };

  const handleStatusToggle = (id: string) => {
     setShots(prev => prev.map(s => {
        if (s.id === id) {
           const nextStatus = s.status === 'Draft' ? 'Approved' : s.status === 'Approved' ? 'Shot' : 'Draft';
           return { ...s, status: nextStatus };
        }
        return s;
     }));
  };

  const handlePriorityCycle = (id: string) => {
    const priorities: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];
    setShots(prev => prev.map(s => {
      if (s.id === id) {
        const idx = priorities.indexOf(s.priority);
        const next = priorities[(idx + 1) % 3];
        return { ...s, priority: next };
      }
      return s;
    }));
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
    setShots([newShot, ...shots]);
    addToast("New shot added to list", "success");
  };

  const handleCopilotSubmit = async () => {
    if (!copilotInput.trim()) return;
    
    setIsCopilotLoading(true);
    try {
      let context = { 
        vibe: 'editorial', 
        numberOfItems: shots.length + 1, 
        shootType: 'campaign', 
        referenceBrands: '', 
        turnaround: 'standard' 
      };
      
      const saved = localStorage.getItem('active_campaign');
      if (saved) {
         try {
           const parsed = JSON.parse(saved);
           context = { ...context, ...parsed };
         } catch (e) { console.error("Failed to parse campaign ctx"); }
      }

      const updatedAiShots = await generateShotList({
         ...context,
         numberOfItems: shots.length + 1,
         refinement: copilotInput,
         currentShots: shots
      });

      const mergedShots = mapShots(updatedAiShots, shots);
      setShots(mergedShots);
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
