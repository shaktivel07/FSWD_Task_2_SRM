import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext.jsx";
import StatCard from "../components/StatCard.jsx";
import TaskList from "../components/TaskList.jsx";
import { todayISO } from "../utils/validation.js";

function Dashboard() {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const today = todayISO();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const overdue = tasks.filter((t) => !t.completed && t.dueDate < today).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const dueToday = tasks.filter((t) => t.dueDate === today);

  const handleDelete = (id) => {
    if (window.confirm("Delete this task permanently?")) deleteTask(id);
  };

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Your day at a glance.</p>
        </div>
        <Link to="/tasks/new" className="btn btn-primary">+ New Task</Link>
      </div>

      <div className="stat-grid">
        <StatCard label="Total tasks" value={total} />
        <StatCard label="Pending" value={pending} tone="warn" />
        <StatCard label="Completed" value={completed} tone="good" />
        <StatCard label="Overdue" value={overdue} tone="bad" />
      </div>

      <div className="card">
        <div className="progress-head">
          <strong>Overall progress</strong>
          <span>{percent}%</span>
        </div>
        <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <h2>Due today</h2>
      <TaskList
        tasks={dueToday}
        onToggle={toggleTask}
        onDelete={handleDelete}
        emptyMessage="Nothing is due today. Enjoy the free time or add a new task."
      />
    </section>
  );
}

export default Dashboard;
