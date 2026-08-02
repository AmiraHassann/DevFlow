import styles from "../Tasks.module.css";

function TaskStats({
  totalTasks,
  completedTasks,
  pendingTasks,
}) {
  return (
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <span>Total</span>
        <strong>{totalTasks}</strong>
      </div>

      <div className={styles.statCard}>
        <span>Completed</span>
        <strong>{completedTasks}</strong>
      </div>

      <div className={styles.statCard}>
        <span>Pending</span>
        <strong>{pendingTasks}</strong>
      </div>
    </div>
  );
}

export default TaskStats;
