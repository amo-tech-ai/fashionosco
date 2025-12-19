import React, { useState } from 'react';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { TalentStatus, ReadinessStatus, ProductionCue } from '../../../types/production';
import { useToast } from '../../ToastProvider';
import { useProductionState } from '../../../hooks/useProductionState';

// Modular Components
import { DeskHeader } from './production-desk/DeskHeader';
import { CrewReadiness } from './production-desk/CrewReadiness';
import { CueDisplay } from './production-desk/CueDisplay';
import { ShowFlow } from './production-desk/ShowFlow';
import { ControlBar } from './production-desk/ControlBar';
import { TelemetryWidget } from './production-desk/TelemetryWidget';

const DEFAULT_CUES: ProductionCue[] = [
  { id: '1', time: '19:00', duration: '5m', title: 'HOUSE DIM / INTRO VIDEO', description: 'Fade house to 10%. Trigger loop B.', category: 'logistics', status: 'confirmed', isComplete: false, audioCue: 'Track 01: Ambient Noir', lightingCue: 'Blue Wash 20%', stageCue: 'Close Main Curtains' },
  { id: '2', time: '19:05', duration: '2m', title: 'OPENING LOOK: SILK SERIES', description: 'Model 1 enters from Stage Left.', category: 'runway', status: 'confirmed', isComplete: false, audioCue: 'Bass Drop Sync', lightingCue: 'Pin Spot Center', stageCue: 'Model 1 Release' },
  { id: '3', time: '19:07', duration: '15m', title: 'MAIN CATWALK SEQUENCE', description: 'Interval release every 25s.', category: 'runway', status: 'confirmed', isComplete: false, audioCue: 'Show Mix Loop', lightingCue: 'Full Runway White', stageCue: 'Sequential Release' },
];

export const ProductionDesk: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { activeCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  
  const { 
    callSheet: cues, 
    activeBlockIndex: activeCueIndex, 
    advanceBlock: advanceCue, 
    setActiveBlockIndex: setActiveCueIndex, 
    currentTime, 
    stats 
  } = useProductionState<ProductionCue>(
    activeCampaign?.data?.samples || [], 
    activeCampaign?.data?.timeline || DEFAULT_CUES
  );

  const [talent, setTalent] = useState<TalentStatus[]>([
    { id: '1', name: 'Sarah Jenkins', role: 'Model', status: 'ready', assignment: 'Look 01, 12' },
    { id: '2', name: 'Bella Hadid', role: 'Model', status: 'dressed', assignment: 'Look 02, 15' },
    { id: '3', name: 'Marcus Chen', role: 'Lead Stylist', status: 'ready' },
    { id: '4', name: 'Amara Diop', role: 'MUA', status: 'arrived' },
  ]);

  const toggleTalentStatus = (id: string) => {
    const statuses: ReadinessStatus[] = ['pending', 'arrived', 'in-makeup', 'dressed', 'ready'];
    setTalent(prev => prev.map(t => {
      if (t.id === id) {
        const currentIdx = statuses.indexOf(t.status);
        const nextStatus = statuses[(currentIdx + 1) % statuses.length];
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleNext = () => {
    const success = advanceCue();
    if (success) {
      addToast(`Advancing to: ${cues[activeCueIndex + 1].title}`, "info");
    } else {
      addToast("Production flow sequence complete.", "success");
    }
  };

  const currentCue = cues[activeCueIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col font-mono selection:bg-red-600 overflow-hidden">
      <DeskHeader 
        campaignTitle={activeCampaign?.title} 
        isRunning={isRunning} 
        time={currentTime}
        onClose={onClose} 
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <aside className="w-80 md:w-96 border-r border-white/10 flex flex-col bg-[#080808] shrink-0 overflow-y-auto hide-scrollbar">
           <CrewReadiness 
             talent={talent} 
             onToggleStatus={toggleTalentStatus} 
           />
           <div className="p-6">
              <TelemetryWidget stats={stats} />
           </div>
        </aside>

        <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_center,#111_0%,#050505_100%)]">
           <CueDisplay cue={currentCue} index={activeCueIndex} />
           
           <ControlBar 
             isRunning={isRunning} 
             onToggle={() => setIsRunning(!isRunning)} 
             onNext={handleNext} 
           />
        </main>

        <ShowFlow 
          cues={cues} 
          activeCueIndex={activeCueIndex} 
          onJumpToCue={setActiveCueIndex}
        />
      </div>
    </div>
  );
};