import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/tasks", label: "My Tasks", end: true },
  { to: "/tasks/new", label: "Add Task" },
  { to: "/about", label: "About" },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="brand">✔ Daily Task Manager</span>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
