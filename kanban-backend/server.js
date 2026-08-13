const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
    { id: "1", title: "Learn Express.js", status: "todo" },
    { id: "2", title: "Build Kanban Board", status: "in-progress" }
];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const newTask = req.body; 
    tasks.push(newTask);     
    res.status(201).json(newTask); 
});

app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id; 
    const newStatus = req.body.status; 
    tasks = tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
    );
    
    res.json({ message: "Task updated successfully!" });
});

app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: "Task deleted successfully!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});