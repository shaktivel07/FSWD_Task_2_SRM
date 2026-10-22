import { Link } from "react-router-dom";
import { todayISO } from "../utils/validation.js";

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

function TaskItem({ task, onToggle, onDelete }) {
  const overdue = !task.completed && task.dueDate < todayISO();

  return (
    <li className={`task-item${task.completed ? " done" : ""}`}>
      <input
        type="checkbox"
        className="task-check"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "pending" : "completed"}`}
      />
      <div className="task-body">
        <p className="task-title">{task.title}</p>
        {task.description && <p className="task-desc">{task.description}</p>}
        <div className="task-meta">
          <span className={`badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
          <span className="badge category">{task.category}</span>
          <span className={`due${overdue ? " overdue" : ""}`}>
            Due {formatDate(task.dueDate)}
            {overdue && " · Overdue"}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <Link to={`/tasks/${task.id}/edit`} className="btn btn-small btn-light">
          Edit
        </Link>
        <button type="button" className="btn btn-small btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
