import styles from "../Dashboard.module.css";

function RecentActivity({ activities = [] }) {
  const recentActivities =
    activities.slice(0, 5);

  const getActivityIcon = (
    action
  ) => {
    if (action.includes("Created"))
      return "✅";

    if (action.includes("Updated"))
      return "✏️";

    if (action.includes("Deleted"))
      return "🗑️";

    if (action.includes("Restored"))
      return "♻️";
  };

  return (
    <section className={styles.activityCard}>
      <h2>Recent Activity</h2>

      <p className={styles.activitySubtitle}>
        Latest actions across your workspace
      </p>

      {recentActivities.length === 0 ? (
        <div className={styles.emptyActivity}>
          No recent activity yet.
        </div>
      ) : (
        <div className={styles.activityList}>
          {recentActivities.map(
            (activity) => (
              <div
                key={activity.id}
                className={
                  styles.activityItem
                }
              >
                <div
                  className={
                    styles.activityIcon
                  }
                >
                  {getActivityIcon(
                    activity.action
                  )}
                </div>

                <div
                  className={
                    styles.activityContent
                  }
                >
                  <h4>
                    {activity.action}
                  </h4>

                  <p>
                    {activity.title}
                  </p>
                </div>

                <span
                  className={
                    styles.activityTime
                  }
                >
                  {activity.timestamp}
                </span>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}

export default RecentActivity;