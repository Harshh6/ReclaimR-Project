import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">

      {/* =========================
          LOGO
      ========================= */}

      <Link to="/home" className="logo-placeholder">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="ReclaimR"
          className="reclaimr-logo"
        />
      </Link>


      {/* =========================
          NAVIGATION LINKS
      ========================= */}

      <div className="nav-links">

        {/* HOME */}
        <Link
          to="/home"
          className={
            location.pathname === "/home"
              ? "active"
              : ""
          }
        >
          HOME
        </Link>


        {/* LOST & FOUND */}
        <Link
          to="/lost-found"
          className={
            location.pathname === "/lost-found"
              ? "active"
              : ""
          }
        >
          LOST & FOUND
        </Link>


        {/* HOW IT WORKS */}
        <Link
          to="/how-it-works"
          className={
            location.pathname === "/how-it-works"
              ? "active"
              : ""
          }
        >
          HOW IT WORKS
        </Link>


        {/* ABOUT US */}
        <Link
          to="/about"
          className={
            location.pathname === "/about"
              ? "active"
              : ""
          }
        >
          ABOUT US
        </Link>


        {/* HELP US */}
        <Link
          to="/help"
          className={
            location.pathname === "/help"
              ? "active"
              : ""
          }
        >
          HELP US
        </Link>

      </div>


      {/* =========================
          PROFILE
      ========================= */}

      <Link
        to="/profile"
        className="profile-circle"
      >
        👤
      </Link>

    </nav>
  );
}