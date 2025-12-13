
import React from 'react';
import { GripVertical, Edit2, Trash2, Save, ShoppingBag } from 'lucide-react';
import { Shot } from '../../../../types/ai';

interface ShotItemProps {
  shot: Shot;
  index: number;
  isEditing: boolean;
  isDragged: boolean;
  editForm: { name: string; description: string };
  setEditForm: (form: { name: string; description: string }) => void;
  onEditStart: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onPriorityCycle: () => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}

export const ShotItem: React.FC<ShotItemProps> = ({
  shot,
  index,
  isEditing,
  isDragged,
  editForm,
  setEditForm,
  onEditStart,
  onSave,
  onCancel,
  onDelete,
  onPriorityCycle,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      className={`p-4 hover:bg-gray-50 rounded-lg transition-colors group animate-in slide-in-from-bottom-2 ${
        isDragged ? 'opacity-50 border-2 border-dashed border-gray-300' : 'border-b border-gray-50 last:border-0'
      }`}
      style={{ animationDelay: `${index * 50}ms`, cursor: 'grab' }}
    >
      {isEditing ? (
        <div className="space-y-3 bg-white p-2 rounded shadow-sm border border-gray-200">
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            className="w-full text-sm font-bold border-b border-gray-300 focus:border-black outline-none pb-1 bg-transparent"
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="w-full text-xs text-gray-600 border border-gray-200 rounded p-2 focus:border-black outline-none bg-white"
            rows={2}
          />
          <div className="flex gap-2 justify-end">
            <button onClick={onCancel} className="text-xs text-gray-500 hover:text-black">
              Cancel
            </button>
            <button
              onClick={onSave}
              className="text-xs font-bold text-green-600 flex items-center gap-1"
            >
              <Save size={12} /> Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2 pt-1">
            <GripVertical size={14} className="text-gray-300 cursor-grab" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                {shot.name}
                <div 
                  className={`w-2 h-2 rounded-full ${
                    shot.priority === 'High' ? 'bg-red-500' : 
                    shot.priority === 'Medium' ? 'bg-yellow-500' : 
                    'bg-gray-300'
                  }`}
                  title={`Priority: ${shot.priority}`}
                />
              </h4>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={onEditStart}>
                  <Edit2 size={12} className="text-gray-400 hover:text-black" />
                </button>
                <button onClick={onDelete}>
                  <Trash2 size={12} className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">{shot.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                {shot.angle}
              </span>
              <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                {shot.lighting}
              </span>
              {shot.props && (
                <span className="text-[10px] text-orange-600 bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <ShoppingBag size={8} /> {shot.props}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={onPriorityCycle}
              className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-wider"
            >
              {shot.priority}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
