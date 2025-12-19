import React, { useState } from 'react';
import { Share2, Download, Play, Pause, SkipForward, QrCode } from 'lucide-react';
import { ProductionHeader } from '../components/production/ProductionHeader';
import { SetIntelligence } from '../components/production/SetIntelligence';
import { InventoryLedger } from '../components/production/InventoryLedger';
import { ProductionCallSheet } from '../components/production/ProductionCallSheet';
import { SampleTracker } from '../components/production/SampleTracker';
import { ProductSample, CallSheetBlock, EnvironmentalSignals } from '../types/production';
import { useProductionState } from '../hooks/useProductionState';
import { useAutonomousAssistant } from '../hooks/useAutonomousAssistant';
import { Button } from '../components/Button';

const MOCK_SAMPLES: ProductSample[] = [
  { id: '1', name: 'Silk Charmeuse Gown', sku: 'FW25-DR-001', status: 'on-set', isHero: true, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300' },
  { id: '2', name: 'Linen Belted Blazer', sku: 'FW25-JK-042', status: 'shot', isHero: false, image: 'https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=300' },
  { id: '3', name: 'Cashmere Ribbed Knit', sku: 'FW25-KN-012', status: 'awaiting', isHero: true, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=300' },
  { id: '4', name: 'Leather Slim Trouser', sku: 'FW25-PN-088', status: 'on-set', isHero: false, image: 'https://images.unsplash.com/photo-1594234568858-a5c9f50f3b9e?q=80&w=300' },
];

const MOCK_CALLSHEET: CallSheetBlock[] = [
  { id: '1', time: '09:00', duration: '60m', title: 'Crew Call / Load-in', description: 'Equipment prep and safety briefing.', category: 'logistics', status: 'confirmed', location_name: 'Studio A', talent_required: [], is_outdoor: false },
  { id: '2', time: '10:30', duration: '120m', title: 'Look 01: Urban Brutalist', description: 'Primary hero look in natural light.', category: 'runway', status: 'pending', location_name: 'Outdoor Courtyard', talent_required: ['Sarah J.'], is_outdoor: true },
  { id: '3', time: '13:00', duration: '90m', title: 'Look 02: Studio Minimal', description: 'High-contrast studio lighting.', category: 'runway', status: 'pending', location_name: 'Studio B', talent_required: ['Sarah J.'], is_outdoor: false },
];

export const ProductionMode: React.FC = () => {
  const [view, setView] = useState<'timeline' | 'inventory'>('timeline');
  const [isRunning, setIsRunning] = useState(false);
  const [hasIntervention, setHasIntervention] = useState(true);

  const { 
    samples, 
    callSheet, 
    stats, 
    updateSampleStatus, 
    advanceBlock,
    setCallSheet 
  } = useProductionState(MOCK_SAMPLES, MOCK_CALLSHEET);

  const remainingShots = samples.filter(s => s.status !== 'shot').length;
  useAutonomousAssistant(stats, remainingShots);

  const signals: EnvironmentalSignals = {
    weather: { condition: 'overcast', temp: '19°C', icon: 'cloud' },
    travelRisk: 'Low'
  };

  const handleApplyStrategy = () => {
     const updated = [...callSheet];
     // Logic: Pivot outdoor looks to end of day if weather is shifting
     const outdoorIdx = updated.findIndex(item => item.is_outdoor);
     if (outdoorIdx > -1) {
        const [look] = updated.splice(outdoorIdx, 1);
        updated.push({ ...look, ai_note: 'Prioritized for Safety' });
        setCallSheet(updated);
        setHasIntervention(false);
     }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-mono selection:bg-red-600">
      <ProductionHeader signals={signals} />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Intelligence Sidebar */}
        <aside className="w-full lg:w-96 border-r border-white/10 flex flex-col bg-[#080808] shrink-0 overflow-y-auto hide-scrollbar">
           <div className="p-8 border-b border-white/10 bg-black/40">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Telemetry & Intel</h3>
           </div>
           
           <div className="p-6 space-y-6">
              <SetIntelligence 
                latency={stats.latency} 
                progress={stats.progress} 
                isBehind={stats.isBehind} 
                health={stats.health}
                remainingShots={remainingShots}
                requiredVelocity={stats.requiredMinutesPerLook}
              />

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">View Controls</h4>
                 <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setView('timeline')}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all ${view === 'timeline' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                       Timeline
                    </button>
                    <button 
                      onClick={() => setView('inventory')}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all ${view === 'inventory' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                       Inventory
                    </button>
                 </div>
              </div>
           </div>

           <div className="mt-auto p-6 border-t border-white/10 bg-black/60">
              <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 FASHION_OS CORE v2.5.0_LIVE
              </div>
           </div>
        </aside>

        {/* Operational Canvas */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_center,#111_0%,#050505_100%)]">
           <div className="flex-1 overflow-y-auto p-8 lg:p-16 custom-scrollbar">
              {view === 'timeline' ? (
                 <ProductionCallSheet 
                    callSheet={callSheet} 
                    hasIntervention={hasIntervention}
                    onApplyStrategy={handleApplyStrategy}
                    onIgnore={() => setHasIntervention(false)}
                 />
              ) : (
                 <SampleTracker 
                    samples={samples} 
                    onUpdateStatus={updateSampleStatus} 
                 />
              )}
           </div>

           {/* Live Control Bar */}
           <div className="p-10 bg-black/90 backdrop-blur-xl border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex gap-4">
                 <button 
                    onClick={() => setIsRunning(!isRunning)}
                    className={`group flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 ${
                      isRunning ? 'bg-yellow-500 text-black' : 'bg-red-600 text-white'
                    }`}
                 >
                    {isRunning ? <><Pause size={20} fill="currentColor" /> PAUSE SESSION</> : <><Play size={20} fill="currentColor" /> START PRODUCTION</>}
                 </button>
                 
                 <button 
                    onClick={advanceBlock}
                    className="flex items-center gap-4 px-10 py-5 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-200 transition-all active:scale-95"
                 >
                    ADVANCE SEGMENT <SkipForward size={20} fill="currentColor" />
                 </button>
              </div>

              <div className="flex gap-8">
                 <div className="text-right">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Optical Engine</div>
                    <button className="flex items-center gap-2 text-white font-bold text-xs hover:text-purple-400 transition-colors">
                       <QrCode size={16} /> SCAN SKU TAG
                    </button>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};