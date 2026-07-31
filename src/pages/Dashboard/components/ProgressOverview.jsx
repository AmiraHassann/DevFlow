import styles from "../Dashboard.module.css";

function ProgressOverview({
  totalTasks,
  completedTasks,
}) {
  const progress =
    totalTasks > 0
      ? Math.round(
          (completedTasks /
            totalTasks) *
            100
        )
      : 0;

  return (
    <section
      className={styles.progressOverview}
    >
      <div className={styles.progressCard}>
        <h2>
          Overall Progress
        </h2>

        <div
          className={
            styles.progressInfo
          }
        >
          <span
            className={
              styles.progressPercent
            }
          >
            {progress}%
          </span>

          <span
            className={
              styles.progressText
            }
          >
            {completedTasks} of{" "}
            {totalTasks} tasks
            completed
          </span>
        </div>

        <div
          className={
            styles.progressBar
          }
        >
          <div
            className={
              styles.progressFill
            }
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default ProgressOverview;