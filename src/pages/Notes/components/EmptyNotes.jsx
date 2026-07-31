import styles from "../Notes.module.css";

function EmptyNotes() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        📝
      </div>

      <h2>No Notes Yet</h2>

      <p>
        Create your first note to keep
        track of ideas, tasks, and important
        information.
      </p>
    </div>
  );
}

export default EmptyNotes;