import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const isAdmin =
    user &&
    (user.role === "SUPER_ADMIN" || user.role === "ADMIN");

  const adminPath =
    user?.role === "ADMIN" ? "/admin" : "/super-admin";

  const profilePath =
    user?.role === "PATIENT"
      ? "/dashboard"
      : user?.role === "PROVIDER"
      ? "/provider"
      : adminPath;

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo">
          GenZ <span className="gold">Healthcare</span>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </div>

        {/* LINKS */}
        <div className={`nav-links ${open ? "open" : ""}`}>

          <Link
            to="/"
            className={`nav-item ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>

          <Link
            to="/services"
            className={`nav-item ${isActive("/services") ? "active" : ""}`}
          >
            Services
          </Link>

          <Link
            to="/about"
            className={`nav-item ${isActive("/about") ? "active" : ""}`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`nav-item ${isActive("/contact") ? "active" : ""}`}
          >
            Contact
          </Link>

          {isAdmin && (
            <Link
              to={adminPath}
              className="nav-item admin-badge"
            >
              Admin
            </Link>
          )}

          {/* THEME */}
          <button onClick={toggleTheme} className="theme-btn">
            {theme === "LIGHT" ? "🌙" : "☀️"}
          </button>

          {/* AUTH */}
          {!user ? (
            <>
              <Link to="/login" className="nav-item auth-btn">
                Login
              </Link>
              <Link to="/register" className="nav-item auth-btn">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={profilePath}
                className="nav-item profile-btn"
              >
                Profile
              </Link>

              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;