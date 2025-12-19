
import React, { useState } from 'react';
import { useShotList } from '../hooks/useShotList';
import { useRetouchingTasks } from '../hooks/useRetouchingTasks';
import { AssetsSidebar } from '../components/shotlist/AssetsSidebar';
import { ShotListHeader } from '../components/shotlist/ShotListHeader';
import { ShotItemCard } from '../components/shotlist/ShotItemCard';
import { CopilotSidebar } from '../components/shotlist/CopilotSidebar';
import { Wand2, Camera } from 'lucide-react';

export const ShotList: React.FC = () => {
  const { 
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
  } = useShotList();

  const { tickets } = useRetouchingTasks();
  const [activeTab, setActiveTab] = useState<'production' | 'retouching'>('production');

  const displayShots = activeTab === 'production' ? shots : tickets;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 animate-in fade-in duration-500">
      
      {/* Left Column */}
      <AssetsSidebar />

      {/* Center Column */}
      <div className="flex-1 flex flex-col min-h-0">
         <ShotListHeader shotCount={displayShots.length} onAddShot={addNewShot} />

         {/* View Switcher */}
         <div className="flex gap-4 border-b border-gray-100 mb-6">
            <button 
               onClick={() => setActiveTab('production')}
               className={`pb-4 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'production' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}
            >
               <Camera size={14} /> Production Queue ({shots.length})
            </button>
            <button 
               onClick={() => setActiveTab('retouching')}
               className={`pb-4 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'retouching' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-400 hover:text-black'}`}
            >
               <Wand2 size={14} /> Gallery Tickets ({tickets.length})
            </button>
         </div>

         <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            <div>
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">
                     {activeTab === 'production' ? 'Active Shoots' : 'Visual Correction Requests'}
                  </h3>
                  <div className="h-px flex-1 bg-[#E5E5E5] mx-4"></div>
               </div>
               
               <div className="grid grid-cols-1 gap-4 pb-20">
                  {displayShots.length === 0 ? (
                    <div className="py-20 text-center text-gray-400 italic text-sm">
                       No {activeTab} tasks in the current cycle.
                    </div>
                  ) : (
                    displayShots.map((shot, idx) => (
                       <ShotItemCard
                          key={shot.id}
                          shot={shot}
                          index={idx}
                          isDragged={draggedIndex === idx}
                          onDragStart={handleDragStart}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onStatusToggle={handleStatusToggle}
                          onPriorityCycle={handlePriorityCycle}
                       />
                    ))
                  )}
               </div>
            </div>
         </div>
      </div>

      {/* Right Column */}
      <CopilotSidebar 
        shots={shots}
        copilotInput={copilotInput}
        setCopilotInput={setCopilotInput}
        isCopilotLoading={isCopilotLoading}
        onCopilotSubmit={handleCopilotSubmit}
        onAddShot={addNewShot}
      />

    </div>
  );
};
