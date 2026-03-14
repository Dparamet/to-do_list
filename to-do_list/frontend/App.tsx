import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput.tsx";
import TodoItem from "./components/TodoItem.tsx";

type Task = {
  _id: string;
  message: string;
  is_completed: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then((data: Task[]) => setTasks(data));
  }, []);

  const addTask = async (text: string) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const newTask: Task = await res.json();
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleTask = async (id: string) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, { method: "PATCH" });
    const updated: Task = await res.json();
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  return (
    <div className="app-shell">
      <div className="todo-card">
        <header className="todo-header">
          <h1 className="todo-title">
            My Future Tasks
          </h1>
          <p className="todo-subtitle">Plan your move, make it happen!</p>
        </header>
        
        <TodoInput onAdd={addTask} />

        <div className="todo-list custom-scrollbar">
          {tasks.map((t) => (
            <TodoItem key={t._id} task={t} onDelete={deleteTask} onToggle={toggleTask} />
          ))}
        </div>
      </div>
    </div>
  );
}