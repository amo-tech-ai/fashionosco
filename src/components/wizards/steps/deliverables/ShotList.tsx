
import React, { useState } from 'react';
import { Shot } from '../../../../types/ai';
import { ShotItem } from './ShotItem';

interface ShotListProps {
  shots: Shot[];
  onUpdateList: (newShots: Shot[]) => void;
}

export const ShotList: React.FC<ShotListProps> = ({ shots, onUpdateList }) => {
  const [editingShotId, setEditingShotId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; description: string }>({
    name: '',
    description: '',
  });
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  // --- Handlers ---

  const handleEditClick = (shot: Shot) => {
    setEditingShotId(shot.id);
    setEditForm({ name: shot.name, description: shot.description });
  };

  const handleSaveEdit = (id: string) => {
    const updatedList = shots.map((s) =>
      s.id === id ? { ...s, name: editForm.name, description: editForm.description } : s
    );
    onUpdateList(updatedList);
    setEditingShotId(null);
  };

  const handleCancelEdit = () => {
    setEditingShotId(null);
  };

  const handleDelete = (id: string) => {
    const updatedList = shots.filter((s) => s.id !== id);
    onUpdateList(updatedList);
  };

  const handleCyclePriority = (id: string, current: string) => {
    const priorities: Shot['priority'][] = ['High', 'Medium', 'Low'];
    const currentIndex = priorities.indexOf(current as Shot['priority']);
    const nextPriority = priorities[(currentIndex + 1) % priorities.length];

    const updatedList = shots.map((s) => (s.id === id ? { ...s, priority: nextPriority } : s));
    onUpdateList(updatedList);
  };

  // --- DnD Logic ---

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedItemIndex === null) return;
    const items = [...shots];
    const draggedItem = items[draggedItemIndex];
    items.splice(draggedItemIndex, 1);
    items.splice(targetIndex, 0, draggedItem);
    onUpdateList(items);
    setDraggedItemIndex(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
      {shots.map((shot, idx) => (
        <ShotItem
          key={shot.id}
          index={idx}
          shot={shot}
          isEditing={editingShotId === shot.id}
          isDragged={draggedItemIndex === idx}
          editForm={editForm}
          setEditForm={setEditForm}
          onEditStart={() => handleEditClick(shot)}
          onSave={() => handleSaveEdit(shot.id)}
          onCancel={handleCancelEdit}
          onDelete={() => handleDelete(shot.id)}
          onPriorityCycle={() => handleCyclePriority(shot.id, shot.priority)}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};
