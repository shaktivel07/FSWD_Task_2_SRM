import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext.jsx";
import FilterBar from "../components/FilterBar.jsx";
import TaskList from "../components/TaskList.jsx";

const DEFAULT_FILTERS = { search: "", status: "all", priority: "all", category: "all" };

function Tasks() {
  const { tasks, toggleTask, deleteTask, clearCompleted } = useTasks();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // The visible list is derived from tasks + filters, so it is always in sync
  // (no extra state and no one-render delay).
  const visible = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchSearch =
        !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      const matchStatus =
        filters.status === "all" ||
        (filters.status === "completed" ? t.completed : !t.completed);
      const matchPriority = filters.priority === "all" || t.priority === filters.priority;
      const matchCategory = filters.category === "all" || t.category === filters.category;
      return matchSearch && matchStatus && matchPriority && matchCategory;
    });
  }, [tasks, filters]);

  // Reflect the number of pending tasks in the browser tab title.
  useEffect(() => {
    const pending = tasks.filter((t) => !t.completed).length;
    document.title = `(${pending}) My Tasks · Daily Task Manager`;
    return () => { document.title = "Daily Task Manager"; };
  }, [tasks]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this task permanently?")) deleteTask(id);
  };

  const hasCompleted = tasks.some((t) => t.completed);
  const emptyMessage =
    tasks.length === 0
      ? "No tasks yet. Click “Add Task” to create your first one."
      : "No tasks match your search or filters.";

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>My Tasks</h1>
          <p className="muted">Showing {visible.length} of {tasks.length} tasks</p>
        </div>
        <div className="head-actions">
          {hasCompleted && (
            <button type="button" className="btn btn-light" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
          <Link to="/tasks/new" className="btn btn-primary">+ Add Task</Link>
        </div>
      </div>

      <FilterBar filters={filters} onChange={setFilters} />
      <TaskList tasks={visible} onToggle={toggleTask} onDelete={handleDelete} emptyMessage={emptyMessage} />
    </section>
  );
}

export default Tasks;
