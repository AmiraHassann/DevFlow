import { useState } from "react";

import styles from "./Sidebar.module.css";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../../../firebase/config";

import {
  X,
  LayoutDashboard,
  CheckSquare,
  NotebookPen,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      setShowLogoutModal(false);

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() =>
            setIsSidebarOpen(false)
          }
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen
            ? styles.open
            : ""
        }`}
      >
        <button
          className={styles.closeButton}
          onClick={() =>
            setIsSidebarOpen(false)
          }
        >
          <X size={22} />
        </button>

        <nav>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Main
            </h3>

            <ul className={styles.navList}>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `${styles.navItem} ${
                      isActive
                        ? styles.active
                        : ""
                    }`
                  }
                >
                  <div className={styles.iconContainer}>
                    <LayoutDashboard
                      size={18}
                    />
                  </div>

                  <span>Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/tasks"
                  className={({ isActive }) =>
                    `${styles.navItem} ${
                      isActive
                        ? styles.active
                        : ""
                    }`
                  }
                >
                  <div className={styles.iconContainer}>
                    <CheckSquare
                      size={18}
                    />
                  </div>

                  <span>Tasks</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/notes"
                  className={({ isActive }) =>
                    `${styles.navItem} ${
                      isActive
                        ? styles.active
                        : ""
                    }`
                  }
                >
                  <div className={styles.iconContainer}>
                    <NotebookPen
                      size={18}
                    />
                  </div>

                  <span>Notes</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              System
            </h3>

            <ul className={styles.navList}>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `${styles.navItem} ${
                      isActive
                        ? styles.active
                        : ""
                    }`
                  }
                >
                  <div className={styles.iconContainer}>
                    <Settings
                      size={18}
                    />
                  </div>

                  <span>Settings</span>
                </NavLink>
              </li>

              <li>
                <button
                  className={
                    styles.logoutButton
                  }
                  onClick={() =>
                    setShowLogoutModal(true)
                  }
                >
                  <div className={styles.iconContainer}>
                    <LogOut size={18} />
                  </div>

                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Logout</h3>

            <p>
              Are you sure you want to
              log out?
            </p>

            <div
              className={styles.modalActions}
            >
              <button
                className={
                  styles.cancelButton
                }
                onClick={() =>
                  setShowLogoutModal(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                className={
                  styles.confirmButton
                }
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;