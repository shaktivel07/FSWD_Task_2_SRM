import { useState } from "react";
import { PRIORITIES, CATEGORIES, validateTask, todayISO } from "../utils/validation.js";

const EMPTY = {
  title: "",
  description: "",
  priority: "Medium",
  category: "Personal",
  dueDate: todayISO(),
};

function TaskForm({ initialValues, isEditing, onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues || EMPTY);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateTask(values, isEditing);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
  };

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Title *</label>
        <input id="title" name="title" className="input" value={values.title}
          onChange={handleChange} placeholder="e.g. Finish React assignment" maxLength={80} />
        {errors.title && <span className="error" role="alert">{errors.title}</span>}
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" className="input" rows={3}
          value={values.description} onChange={handleChange} placeholder="Optional details" />
        <span className="hint">{values.description.length}/200</span>
        {errors.description && <span className="error" role="alert">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="priority">Priority *</label>
          <select id="priority" name="priority" className="input" value={values.priority} onChange={handleChange}>
            {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
          {errors.priority && <span className="error" role="alert">{errors.priority}</span>}
        </div>

        <div className="field">
          <label htmlFor="category">Category *</label>
          <select id="category" name="category" className="input" value={values.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {errors.category && <span className="error" role="alert">{errors.category}</span>}
        </div>

        <div className="field">
          <label htmlFor="dueDate">Due date *</label>
          <input id="dueDate" name="dueDate" type="date" className="input" value={values.dueDate} onChange={handleChange} />
          {errors.dueDate && <span className="error" role="alert">{errors.dueDate}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Save Changes" : "Add Task"}
        </button>
        <button type="button" className="btn btn-light" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default TaskForm;
