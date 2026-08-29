import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import Column, { type Task } from './Column';

const API_URL = 'http://localhost:5000/api/tasks';

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then((data: Task[]) => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const taskData: Task = {
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
      const data = await response.json();
      setTasks([...tasks, data.data || taskData]); 
      setNewTask('');
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = String(active.id);
    const newStatus = String(over.id);

    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
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