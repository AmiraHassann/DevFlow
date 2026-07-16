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
        <ul className={styles.navList}>
          <li>
            <button className={`${styles.navItem} ${styles.active}`}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </button>
          </li>

          <li>
            <button className={styles.navItem}>
              <CheckSquare size={20} />
              <span>Tasks</span>
            </button>
          </li>

          <li>
            <button className={styles.navItem}>
              <NotebookPen size={20} />
              <span>Notes</span>
            </button>
          </li>

          <li>
            <button className={styles.navItem}>
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;