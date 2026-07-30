import styles from "../Settings.module.css";

function PreferencesSection({
  startPage,
  setStartPage,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Preferences</h2>

        <p>
          Customize your application
          behavior.
        </p>
      </div>

      <div className={styles.preferenceGroup}>
  <label>Start Page</label>

  <div className={styles.startPageGrid}>
    <button
      className={`${styles.pageCard} ${
        startPage === "dashboard"
          ? styles.selectedCard
          : ""
      }`}
      onClick={() =>
        setStartPage("dashboard")
      }
    >
      <span className={styles.cardIcon}>
        🏠
      </span>

      <span>Dashboard</span>
    </button>

    <button
      className={`${styles.pageCard} ${
        startPage === "tasks"
          ? styles.selectedCard
          : ""
      }`}
      onClick={() =>
        setStartPage("tasks")
      }
    >
      <span className={styles.cardIcon}>
        ✅
      </span>

      <span>Tasks</span>
    </button>

    <button
      className={`${styles.pageCard} ${
        startPage === "notes"
          ? styles.selectedCard
          : ""
      }`}
      onClick={() =>
        setStartPage("notes")
      }
    >
      <span className={styles.cardIcon}>
        📝
      </span>

      <span>Notes</span>
    </button>
  </div>
</div>
    </div>
  );
}

export default PreferencesSection;