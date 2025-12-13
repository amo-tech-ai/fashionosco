
import React from 'react';
import { 
  GripVertical, 
  Image as ImageIcon, 
  MoreHorizontal,
  ShoppingBag,
  Aperture,
  Sun
} from 'lucide-react';
import { ShotItem } from '../../types/shotlist';

interface ShotItemCardProps {
  shot: ShotItem;
  index: number;
  isDragged: boolean;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onStatusToggle: (id: string) => void;
  onPriorityCycle: (id: string) => void;
}

export const ShotItemCard: React.FC<ShotItemCardProps> = ({
  shot,
  index,
  isDragged,
  onDragStart,
  onDragOver,
  onDrop,
  onStatusToggle,
  onPriorityCycle
}) => {
  
  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusStyles = (s: string) => {
    if (s === 'Approved') return 'bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]';
    if (s === 'Shot') return 'bg-[#DBEAFE] text-[#1E40AF] border-[#DBEAFE]';
    return 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB] hover:bg-white hover:border-[#D1D5DB]';
  };

  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      className={`bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group flex gap-4 items-start cursor-default ${isDragged ? 'opacity-50 border-dashed border-gray-400' : ''}`}
    >
      <div className="cursor-grab active:cursor-grabbing text-[#E5E5E5] hover:text-[#9CA3AF] transition-colors p-1 mt-2">
        <GripVertical size={18} />
      </div>
      
      {/* Thumbnail */}
      <div className="w-20 h-20 bg-[#F7F7F5] rounded-lg border border-[#E5E5E5] flex items-center justify-center text-[#9CA3AF] flex-shrink-0 relative overflow-hidden mt-1">
        <ImageIcon size={24} />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-[#1A1A1A]">{shot.name}</h4>
            <div 
              className={`w-2 h-2 rounded-full cursor-pointer hover:scale-125 transition-transform ${getPriorityColor(shot.priority)}`} 
              title={`Priority: ${shot.priority} (Click to Cycle)`}
              onClick={(e) => { e.stopPropagation(); onPriorityCycle(shot.id); }}
            ></div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onStatusToggle(shot.id)}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${getStatusStyles(shot.status)}`}
            >
              {shot.status}
            </button>
            <button className="p-1 hover:bg-[#F7F7F5] rounded text-[#6B7280]">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{shot.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {shot.angle && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-100 rounded text-[10px] font-medium text-gray-600">
              <Aperture size={10} /> {shot.angle}
            </span>
          )}
          {shot.lighting && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-100 rounded text-[10px] font-medium text-gray-600">
              <Sun size={10} /> {shot.lighting}
            </span>
          )}
          {shot.props && shot.props !== '-' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 border border-orange-100 rounded text-[10px] font-medium text-orange-700">
              <ShoppingBag size={10} /> {shot.props}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
