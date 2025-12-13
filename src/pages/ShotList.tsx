
import React from 'react';
import { useShotList } from '../hooks/useShotList';
import { AssetsSidebar } from '../components/shotlist/AssetsSidebar';
import { ShotListHeader } from '../components/shotlist/ShotListHeader';
import { ShotItemCard } from '../components/shotlist/ShotItemCard';
import { CopilotSidebar } from '../components/shotlist/CopilotSidebar';

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

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 animate-in fade-in duration-500">
      
      {/* Left Column */}
      <AssetsSidebar />

      {/* Center Column */}
      <div className="flex-1 flex flex-col min-h-0">
         <ShotListHeader shotCount={shots.length} onAddShot={addNewShot} />

         <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            <div>
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Active Shots</h3>
                  <div className="h-px flex-1 bg-[#E5E5E5] mx-4"></div>
                  <span className="text-xs text-[#9CA3AF]">Drag to reorder</span>
               </div>
               
               <div className="grid grid-cols-1 gap-4">
                  {shots.map((shot, idx) => (
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
                  ))}
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
