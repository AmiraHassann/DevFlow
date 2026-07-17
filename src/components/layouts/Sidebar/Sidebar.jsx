import styles from "./Sidebar.module.css";

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
                <button
                  className={`${styles.navItem} ${styles.active}`}
                >
                  <div className={styles.iconContainer}>
                    <LayoutDashboard size={18} />
                  </div>

                  <span>Dashboard</span>
                </button>
              </li>

              <li>
                <button className={styles.navItem}>
                  <div className={styles.iconContainer}>
                    <CheckSquare size={18} />
                  </div>

                  <span>Tasks</span>
                </button>
              </li>

              <li>
                <button className={styles.navItem}>
                  <div className={styles.iconContainer}>
                    <NotebookPen size={18} />
                  </div>

                  <span>Notes</span>
                </button>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>System</h3>

            <ul className={styles.navList}>
              <li>
                <button className={styles.navItem}>
                  <div className={styles.iconContainer}>
                    <Settings size={18} />
                  </div>

                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;