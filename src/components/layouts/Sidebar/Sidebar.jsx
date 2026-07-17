import styles from "./Sidebar.module.css";

import { NavLink } from "react-router-dom";

import {
  X,
  LayoutDashboard,
  CheckSquare,
  NotebookPen,
  Settings,
} from "lucide-react";

function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  return (
    <>
      {isSidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.open : ""
        }`}
      >
        <button
          className={styles.closeButton}
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={22} />
        </button>

        <nav>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Main</h3>

            <ul className={styles.navList}>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `${styles.navItem} ${
                      isActive ? styles.active : ""
                    }`
                  }
                >
                  <div className={styles.iconContainer}>
                    <LayoutDashboard size={18} />
                  </div>

                  <span>Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/tasks"
                  className={({ isActive }) =>
                    `${styles.navItem} ${
                      isActive ? styles.active : ""
                    }`
                  }
                >
                  <div className={styles.iconContainer}>
                    <CheckSquare size={18} />
                  </div>

                  <span>Tasks</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/notes"
                  className={({ isActive }) =>
                    `${styles.navItem} ${
                      isActive ? styles.active : ""
                    }`
                  }
                >
                  <div className={styles.iconContainer}>
                    <NotebookPen size={18} />
                  </div>

                  <span>Notes</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>System</h3>

            <ul className={styles.navList}>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `${styles.navItem} ${
                      isActive ? styles.active : ""
                    }`
                  }
                >
                  <div className={styles.iconContainer}>
                    <Settings size={18} />
                  </div>

                  <span>Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;