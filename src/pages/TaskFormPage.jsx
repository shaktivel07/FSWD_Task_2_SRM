import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext.jsx";
import TaskForm from "../components/TaskForm.jsx";

function TaskFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, addTask, updateTask } = useTasks();

  const isEditing = Boolean(id);
  const existing = isEditing ? tasks.find((t) => t.id === Number(id)) : null;

  if (isEditing && !existing) return <Navigate to="/tasks" replace />;

  const handleSubmit = (values) => {
    if (isEditing) updateTask(existing.id, values);
    else addTask(values);
    navigate("/tasks");
  };

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>{isEditing ? "Edit Task" : "Add New Task"}</h1>
          <p className="muted">Fields marked * are required.</p>
        </div>
      </div>
      <TaskForm
        key={id || "new"}
        initialValues={existing || undefined}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/tasks")}
      />
    </section>
  );
}

export default TaskFormPage;
