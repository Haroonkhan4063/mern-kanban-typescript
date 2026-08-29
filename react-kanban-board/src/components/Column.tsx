import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

export interface Task {
  id: string;
  title: string;
  status: string;
}

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onDelete: (id: string) => void;
}

export default function Column({ id, title, tasks, onDelete }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`column ${isOver ? 'column-hover' : ''}`}
    >
      <h3 className="column-title">{title} ({tasks.length})</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}