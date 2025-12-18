
import React, { useState } from 'react';
import { Share2, Download, Play, Zap, Clock, Package, ShieldCheck } from 'lucide-react';
import { ProductionHeader } from '../components/production/ProductionHeader';
import { ProductionSidebar } from '../components/production/ProductionSidebar';
import { ProductionCallSheet } from '../components/production/ProductionCallSheet';
import { SampleTracker } from '../components/production/SampleTracker';
import { SetIntelligence } from '../components/production/SetIntelligence';
import { UsageRightsTracker } from '../components/production/UsageRightsTracker';
import { ProductSample, UsageRight, CallSheetBlock, EnvironmentalSignals } from '../types/production';
import { useProductionState } from '../hooks/useProductionState';
import { useAutonomousAssistant } from '../hooks/useAutonomousAssistant';

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

const MOCK_RIGHTS: UsageRight[] = [
  { id: '1', assetName: 'Hero Campaign V1', thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=200', tier: 'unlimited', expiryDate: '2026-10-24', status: 'active' },
];

export const ProductionMode: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'samples' | 'rights' | 'callsheet'>('samples');
  const [hasIntervention, setHasIntervention] = useState(true);
  
  const { 
    samples, 
    callSheet, 
    stats, 
    updateSampleStatus, 
    confirmTimelineItem,
    setCallSheet 
  } = useProductionState(MOCK_SAMPLES, MOCK_CALLSHEET);

  // Initialize Autonomous Intelligence
  const remainingShots = samples.filter(s => s.status !== 'shot').length;
  useAutonomousAssistant(stats, remainingShots);

  const signals: EnvironmentalSignals = {
    weather: { condition: 'overcast', temp: '19°C', icon: 'cloud' },
    travelRisk: 'Low'
  };

  const handleApplyStrategy = () => {
     const updated = [...callSheet];
     const outdoorIdx = updated.findIndex(item => item.is_outdoor);
     const indoorIdx = updated.findIndex(item => !item.is_outdoor && item.category === 'runway');
     
     if (outdoorIdx > -1 && indoorIdx > -1) {
        const temp = { ...updated[outdoorIdx] };
        updated[outdoorIdx] = { ...updated[indoorIdx], time: temp.time, ai_note: 'Prioritized for Lighting' };
        updated[indoorIdx] = { ...temp, time: updated[indoorIdx].time, ai_note: 'Delayed for Safety' };
        setCallSheet(updated);
        setHasIntervention(false);
     }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans selection:bg-purple-200">
      <ProductionHeader signals={signals} />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Sidebar Intelligence */}
        <div className="lg:col-span-3 space-y-6">
           <ProductionSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
           <SetIntelligence 
             latency={stats.latency} 
             progress={stats.progress} 
             isBehind={stats.isBehind} 
             health={stats.health}
             remainingShots={remainingShots}
             requiredVelocity={stats.requiredMinutesPerLook}
           />
        </div>

        {/* Dynamic Operational Content */}
        <section className="lg:col-span-9 animate-in fade-in slide-in-from-right-4 duration-500">
           <div className="mb-12 flex justify-between items-end">
              <div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-3">Live Production Command</span>
                 <h2 className="font-serif text-5xl text-[#1A1A1A]">
                    {activeTab === 'samples' && 'Inventory Ledger'}
                    {activeTab === 'rights' && 'Licensing Guardian'}
                    {activeTab === 'callsheet' && 'Reactive Timeline'}
                 </h2>
              </div>
              <div className="flex gap-3">
                 <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-black hover:border-black transition-all shadow-sm group">
                    <Share2 size={20} className="group-hover:scale-110 transition-transform" />
                 </button>
                 <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-black hover:border-black transition-all shadow-sm group">
                    <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                 </button>
              </div>
           </div>

           {activeTab === 'samples' && <SampleTracker samples={samples} onUpdateStatus={updateSampleStatus} />}
           {activeTab === 'rights' && <UsageRightsTracker rights={MOCK_RIGHTS} />}
           {activeTab === 'callsheet' && (
              <ProductionCallSheet 
                callSheet={callSheet} 
                hasIntervention={hasIntervention}
                onApplyStrategy={handleApplyStrategy}
                onIgnore={() => setHasIntervention(false)}
              />
           )}
        </section>
      </main>
    </div>
  );
};
