import styles from "../Dashboard.module.css";

function ContinueWorking({
  latestTask,
  latestNote,
}) {
  return (
    <section
      className={styles.continueWorking}
    >
      <div className={styles.sectionHeader}>
        <h2>Continue Working</h2>

        <p>
          Pick up where you left off.
        </p>
      </div>

      <div className={styles.workGrid}>
        <div className={styles.workCard}>
          <span className={styles.workType}>
            📋 Last Task
          </span>

          {latestTask ? (
            <>
              <h3>
                {latestTask.title}
              </h3>

              <p>
                {latestTask.description ||
                  "No description available"}
              </p>

              <div
                className={
                  styles.workMeta
                }
              >
                <span>
                  Status:{" "}
                  {latestTask.status}
                </span>
              </div>
            </>
          ) : (
            <p>
              No recent tasks found.
            </p>
          )}
        </div>

        <div className={styles.workCard}>
          <span className={styles.workType}>
            📝 Last Note
          </span>

          {latestNote ? (
            <>
              <h3>
                {latestNote.title}
              </h3>

              <p>
                {latestNote.content
                  ?.slice(0, 120)}
                ...
              </p>

              <div
                className={
                  styles.workMeta
                }
              >
                <span>
                  Recently Updated
                </span>
              </div>
            </>
          ) : (
            <p>
              No recent notes found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContinueWorking;