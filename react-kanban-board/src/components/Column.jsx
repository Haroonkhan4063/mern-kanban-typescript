import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

export default function Column({ columnId, title, tasks, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`column ${isOver ? 'column-hover' : ''}`}
    >
      {/* Title ke sath tasks ka count bhi dikhayenge */}
      <h2 className="column-title">{title} ({tasks.length})</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}