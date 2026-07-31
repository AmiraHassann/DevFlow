import styles from "../Notes.module.css";

function NotesStats({
  totalNotes,
  pinnedNotes,
  deletedNotes,
}) {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <h3>Total Notes</h3>
        <strong>{totalNotes}</strong>
      </div>

      <div className={styles.statCard}>
        <h3>Pinned Notes</h3>
        <strong>{pinnedNotes}</strong>
      </div>

      <div className={styles.statCard}>
        <h3>Trash</h3>

        <strong>
          {deletedNotes}
        </strong>
      </div>

    </div>
  );
}

export default NotesStats;
