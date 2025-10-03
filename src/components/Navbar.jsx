import { NavLink, useLocation } from "react-router-dom";

export default function Navbar({ onToggleCalm }) {
  const location = useLocation();

  const linkProps = (path) => ({
    to: path,
    className: ({ isActive }) => (isActive ? "active" : undefined),
    "aria-current": location.pathname === path ? "page" : undefined,
  });

  return (
    <nav className="eca-navbar" role="navigation" aria-label="Main navigation">
      <div className="brand">
        <h2 tabIndex={0}>Elderly Care Assistant</h2>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink {...linkProps("/dashboard")}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink {...linkProps("/daily-tasks")}>Daily Tasks</NavLink>
        </li>
        <li>
          <NavLink {...linkProps("/memory-aids")}>Memory Aids</NavLink>
        </li>
        <li>
          <NavLink {...linkProps("/exercises")}>Exercises</NavLink>
        </li>
        <li>
          <NavLink {...linkProps("/companion")}>Companion</NavLink>
        </li>
        <li>
          <NavLink {...linkProps("/profile")}>Profile</NavLink>
        </li>
      </ul>
      <div className="nav-actions">
        <button className="calm-btn" onClick={onToggleCalm} aria-label="Open calm mode">
          Calm Mode
        </button>
      </div>
    </nav>
  );
}
