export const PRIORITIES = ["Low", "Medium", "High"];
export const CATEGORIES = ["Personal", "Study", "Work", "Health", "Shopping"];

export function todayISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// Returns an object of error messages. Empty object = form is valid.
export function validateTask(values, isEditing) {
  const errors = {};
  const title = values.title.trim();

  if (!title) errors.title = "Title is required.";
  else if (title.length < 3) errors.title = "Title must be at least 3 characters.";
  else if (title.length > 60) errors.title = "Title must be 60 characters or fewer.";

  if (values.description.length > 200)
    errors.description = "Description must be 200 characters or fewer.";

  if (!PRIORITIES.includes(values.priority)) errors.priority = "Choose a priority.";
  if (!CATEGORIES.includes(values.category)) errors.category = "Choose a category.";

  if (!values.dueDate) errors.dueDate = "Due date is required.";
  else if (!isEditing && values.dueDate < todayISO())
    errors.dueDate = "Due date cannot be in the past.";

  return errors;
}
