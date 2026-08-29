import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface Task {
  id: string;
  title: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  isOverlay?: boolean;
}

export default function TaskCard({ task, onDelete, isOverlay = false }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    disabled: isOverlay,
  });

  const cardClass = [
    'task-card',
    isDragging ? 'is-dragging' : '',
    isOverlay ? 'is-overlay' : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={isOverlay ? undefined : setNodeRef} className={cardClass}>
      <div className="drag-area" {...(isOverlay ? {} : { ...listeners, ...attributes })}>
        <svg className="drag-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="12" r="1"></circle>
          <circle cx="9" cy="5" r="1"></circle>
          <circle cx="9" cy="19" r="1"></circle>
          <circle cx="15" cy="12" r="1"></circle>
          <circle cx="15" cy="5" r="1"></circle>
          <circle cx="15" cy="19" r="1"></circle>
        </svg>
        <p>{task.title}</p>
      </div>

      {!isOverlay && (
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          title="Delete Task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      )}
    </div>
  );
}