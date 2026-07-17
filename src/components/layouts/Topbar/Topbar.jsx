import styles from "./Topbar.module.css";

import { Menu } from "lucide-react";

function Topbar({ setIsSidebarOpen }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.leftSection}>
        <button
          className={styles.menuButton}
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>

        <div className={styles.logo}>
          <h1>DevFlow</h1>
        </div>
      </div>

      <div className={styles.userSection}>
        <span className={styles.userName}>John Doe</span>

        <div className={styles.avatar}>JD</div>
      </div>
    </header>
  );
}

export default Topbar;