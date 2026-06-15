import { useState } from "react";
import {
  FaBars,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Navbar = ({
  setSidebarOpen,
}) => {
  const [showMenu, setShowMenu] =
    useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <button
        className="menu-btn"
        onClick={() =>
          setSidebarOpen(true)
        }
      >
        <FaBars />
      </button>

      <div className="navbar-title">
        AI Chatbot Dashboard
      </div>

      <div className="profile-wrapper">
        <button
          className="profile-btn"
          onClick={() =>
            setShowMenu(!showMenu)
          }
        >
          <FaUserCircle />
          <span>
            {user?.name || "User"}
          </span>
        </button>

        {showMenu && (
          <div className="profile-dropdown">
            <div className="dropdown-user">
              <strong>
                {user?.name}
              </strong>
              <small>
                {user?.email}
              </small>
            </div>

            <button
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;