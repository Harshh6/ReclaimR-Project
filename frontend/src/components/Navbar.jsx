import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo-placeholder">
        <img
          src="/Logo.png"
          alt="ReclaimR"
          className="reclaimr-logo"
        />
      </div>

      <div className="nav-links">
        <NavLink
          to="/home"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          HOME
        </NavLink>

        <NavLink
          to="/lost-found"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          LOST & FOUND
        </NavLink>

        <NavLink
          to="/how-it-works"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          HOW IT WORKS
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          ABOUT US
        </NavLink>

        <NavLink
          to="/help"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          HELP US
        </NavLink>
      </div>

      <NavLink
        to="/profile"
        className="profile-circle"
        title="Profile"
      >
        👤
      </NavLink>

    </nav>
  );
}