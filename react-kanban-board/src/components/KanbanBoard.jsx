import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

// 🌐 Hamare Node.js Backend ka URL
const API_URL = 'http://localhost:5000/api/tasks';

function Column({ id, title, tasks, onDelete }) {
  const { setNodeRef } = useDroppable({ id });
  
  return (
    <div ref={setNodeRef} className="column">
      <h3 className="column-title">{title} ({tasks.length})</h3>
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // 🟢 1. READ (GET): Page load hote hi backend se saare tasks mangwana
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  // 🔵 2. CREATE (POST): Naya task backend par bhejna
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const taskData = {
      id: Date.now().toString(),
      title: newTask,
      status: 'todo'
    };
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      const savedTask = await response.json();
      setTasks([...tasks, savedTask]); // UI ko update karna
      setNewTask('');
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // 🔴 3. DELETE (DELETE): Backend se task delete karna
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id)); // UI se hatana
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // 🟠 4. UPDATE (PUT): Drag & Drop par status update karna
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id; // Jis column mein drop kiya (todo, in-progress, done)

    // UI ko foran update kar dena taake user ko delay feel na ho
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));

    // Backend ko batana ke database mein bhi status change kar do
    try {
      await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  return (
    <>
      <form className="add-task-form" onSubmit={addTask}>
        <input 
          type="text" 
          placeholder="e.g., Build Express.js backend API for tasks..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="task-input"
        />
        <button type="submit" className="add-btn">Add Task</button>
      </form>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="board">
          <Column 
            id="todo" 
            title="To Do 📝" 
            tasks={tasks.filter(t => t.status === 'todo')} 
            onDelete={deleteTask} 
          />
          <Column 
            id="in-progress" 
            title="In Progress ⏳" 
            tasks={tasks.filter(t => t.status === 'in-progress')} 
            onDelete={deleteTask} 
          />
          <Column 
            id="done" 
            title="Done ✅" 
            tasks={tasks.filter(t => t.status === 'done')} 
            onDelete={deleteTask} 
          />
        </div>
      </DndContext>
    </>
  );
}