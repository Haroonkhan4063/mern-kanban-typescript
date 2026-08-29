import React from 'react';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />

      <main className="main-content">
        <div className="board-container">
          <h2 className="board-header">React Kanban Board</h2>
          <p className="board-subheader">Drag tasks across columns to update their status</p>
          <KanbanBoard />
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 Bytloop. Developed by Muhammad Haroon Khan. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;