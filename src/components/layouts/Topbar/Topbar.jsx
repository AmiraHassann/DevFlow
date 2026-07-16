import styles from "./Topbar.module.css";

function Topbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.logo}>
        <h1>DevFlow</h1>
      </div>

      <div className={styles.userSection}>
        <span className={styles.userName}>Amira Hassan</span>

        <div className={styles.avatar}>AH</div>
      </div>
    </header>
  );
}

export default Topbar;