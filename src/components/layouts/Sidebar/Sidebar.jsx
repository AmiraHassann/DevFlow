import styles from "./Sidebar.module.css";

import {
  LayoutDashboard,
  CheckSquare,
  NotebookPen,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
  <div className={styles.section}>
    <h3 className={styles.sectionTitle}>Main</h3>

    <ul className={styles.navList}>
      <li>
        <button className={`${styles.navItem} ${styles.active}`}>
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
  );
}

export default Sidebar;