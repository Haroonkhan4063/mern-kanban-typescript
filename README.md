 TaskFlow - TypeScript Migration (MERN)

This repository contains the TypeScript migration of the **TaskFlow Kanban Board**, originally built with JavaScript. This migration was completed as part of the **Dev Weekends Fellowship** task.

## 🎯 Dev Weekends Task Requirements Met
*   **✅ Express Routes Typed:** All backend routes (Req, Res, Next) are strictly typed using TypeScript.
*   **✅ Generics Implemented:** Created and utilized a Generic Interface (`ApiResponse<T>`) for standardized API responses.
*   **✅ No Implicit Any:** Strict mode is enabled (`"strict": true`, `"noImplicitAny": true`) across both the frontend and backend.
*   **✅ Core TS Features Used:** Extensively used Interfaces, Enums, and Type Narrowing for robust data validation.

## 🛠️ Tech Stack
*   **Frontend:** React (Vite), TypeScript, `@dnd-kit/core` (for drag-and-drop)
*   **Backend:** Node.js, Express, TypeScript (`tsx` for execution)
*   **Data Handling:** Strongly typed arrays and interfaces.

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Backend Setup
Navigate to the backend directory, install dependencies, and start the server:
```bash
cd kanban-backend
npm install
npm run dev
The backend will run on http://localhost:5000

2. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and start the Vite server:

Bash
cd react-kanban-board
npm install
npm run dev
✨ Features
Drag and Drop: Move tasks seamlessly across "To Do", "In Progress", and "Done" columns.

Full CRUD: Add, view, update (drag/drop status), and delete tasks.

Type Safety: End-to-end type safety preventing runtime errors.

Developed by Muhammad Haroon Khan for Dev Weekends.
