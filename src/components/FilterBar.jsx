import { PRIORITIES, CATEGORIES } from "../utils/validation.js";

const STATUS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

function FilterBar({ filters, onChange }) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="filter-bar">
      <input
        type="search"
        className="input"
        placeholder="Search tasks by title or description..."
        value={filters.search}
        onChange={(e) => set("search", e.target.value)}
        aria-label="Search tasks"
      />

      <div className="status-tabs" role="group" aria-label="Filter by status">
        {STATUS.map((s) => (
          <button
            key={s.value}
            type="button"
            className={`tab${filters.status === s.value ? " selected" : ""}`}
            onClick={() => set("status", s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <select
        className="input"
        value={filters.priority}
        onChange={(e) => set("priority", e.target.value)}
        aria-label="Filter by priority"
      >
        <option value="all">All priorities</option>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <select
        className="input"
        value={filters.category}
        onChange={(e) => set("category", e.target.value)}
        aria-label="Filter by category"
      >
        <option value="all">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
