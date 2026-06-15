import {
  FaTimes,
  FaHome,
  FaRobot,
  FaPalette,
  FaPlug,
  FaUser,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const closeSidebar = () =>
    setSidebarOpen(false);

  return (
    <>
      <div
        className={`sidebar-overlay ${
          sidebarOpen ? "show-overlay" : ""
        }`}
        onClick={closeSidebar}
      />

      <aside
        className={`sidebar ${
          sidebarOpen ? "show-sidebar" : ""
        }`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            🤖
          </div>

          <h2>ChatForge</h2>

          <button
            className="sidebar-close"
            onClick={closeSidebar}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-links">
          <NavLink
            end
            to="/dashboard"
            onClick={closeSidebar}
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            onClick={closeSidebar}
          >
            <FaRobot />
            Bot Settings
          </NavLink>

          <NavLink
            to="/dashboard/appearance"
            onClick={closeSidebar}
          >
            <FaPalette />
            Appearance
          </NavLink>

          <NavLink
            to="/dashboard/integrations"
            onClick={closeSidebar}
          >
            <FaPlug />
            Integrations
          </NavLink>

          <NavLink
            to="/dashboard/account"
            onClick={closeSidebar}
          >
            <FaUser />
            Account
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;