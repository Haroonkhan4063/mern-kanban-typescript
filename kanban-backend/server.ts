import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. Enum
enum TaskStatus {
    Todo = 'todo',
    InProgress = 'in-progress',
    Done = 'done'
}

// 2. Interface
interface Task {
    id: string;
    title: string;
    status: TaskStatus | string;
}

// 3. Generic Interface (Mentor requirement completed)
interface ApiResponse<T> {
    message?: string;
    data?: T;
}

// Strongly typed array
let tasks: Task[] = [
    { id: "1", title: "Learn Express.js", status: TaskStatus.Todo },
    { id: "2", title: "Build Kanban Board", status: TaskStatus.InProgress }
];

app.get('/api/tasks', (req: Request, res: Response<Task[]>) => {
    res.json(tasks);
});

app.post('/api/tasks', (req: Request<{}, {}, Task>, res: Response<ApiResponse<Task>>) => {
    const newTask = req.body; 
    
    // 4. Type Narrowing / Validation
    if (typeof newTask.title !== 'string' || typeof newTask.id !== 'string') {
        res.status(400).json({ message: "Invalid task format. Title and ID must be strings." });
        return;
    }

    tasks.push(newTask);     
    res.status(201).json({ message: "Task created", data: newTask }); 
});

app.put('/api/tasks/:id', (req: Request<{ id: string }, {}, { status: string }>, res: Response<ApiResponse<null>>) => {
    const taskId = req.params.id; 
    const newStatus = req.body.status; 
    
    tasks = tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
    );
    
    res.json({ message: "Task updated successfully!" });
});

app.delete('/api/tasks/:id', (req: Request<{ id: string }>, res: Response<ApiResponse<null>>) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: "Task deleted successfully!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});