import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("dtm_tasks", []);

  const addTask = (data) => {
    const task = {
      ...data,
      title: data.title.trim(),
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
  };

  const updateTask = (id, data) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data, title: data.title.trim() } : t))
    );
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.completed));

  const value = { tasks, addTask, updateTask, deleteTask, toggleTask, clearCompleted };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside <TaskProvider>");
  return ctx;
}
