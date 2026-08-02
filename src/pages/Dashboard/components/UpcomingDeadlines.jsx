import styles from "../Dashboard.module.css";

function UpcomingDeadlines({
  tasks = [],
}) {
  const upcomingTasks = tasks
    .filter(
      (task) =>
        task.dueDate &&
        !task.completed
    )
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    )
    .slice(0, 3);

  return (
    <section className={styles.deadlinesCard}>
      <h2>Upcoming Deadlines</h2>
      
      <p className={styles.cardSubtitle}>
        Stay organized with your upcoming deadlines.
      </p>

      {upcomingTasks.length === 0 ? (
        <p className={styles.emptyDeadlines}>
          No upcoming deadlines.
        </p>
      ) : (
        <div className={styles.deadlinesList}>
          {upcomingTasks.map(
            (task) => (
              <div
                key={task.id}
                className={
                  styles.deadlineItem
                }
              >
                <div>
                  <h4>{task.title}</h4>

                  <p>
                    Due:{" "}
                    {new Date(
                      task.dueDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`${styles.priorityBadge} ${styles[
                    task.priority
                    ]
                    }`}
                >
                  {task.priority}
                </span>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}

export default UpcomingDeadlines;