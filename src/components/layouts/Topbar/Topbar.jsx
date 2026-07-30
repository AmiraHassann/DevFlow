import styles from "./Topbar.module.css";

import { Menu } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";

function Topbar({ setIsSidebarOpen }) {
  const { user } = useAuth();

  const initials =
    user?.displayName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className={styles.topbar}>
      <div className={styles.leftSection}>
        <button
          className={styles.menuButton}
          onClick={() =>
            setIsSidebarOpen(true)
          }
        >
          <Menu size={20} />
        </button>

        <div className={styles.logo}>
          <h1>DevFlow</h1>
        </div>
      </div>

      <div className={styles.userSection}>
        <span className={styles.userName}>
          {user?.displayName ||
            "DevFlow User"}
        </span>

        <div className={styles.avatar}>
          {initials}
        </div>
      </div>
    </header>
  );
}

export default Topbar;