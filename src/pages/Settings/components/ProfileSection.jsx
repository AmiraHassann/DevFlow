import styles from "../Settings.module.css";

function ProfileSection({
  user,
  totalTasks,
  completedTasks,
  totalNotes,
}) {
  const initials =
  user?.displayName
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  return (
    <div className={styles.card}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {initials}
        </div>

        <h2 className={styles.profileName}>
          {user?.displayName ||
            "DevFlow User"}
        </h2>

        <p className={styles.profileEmail}>
          {user?.email}
        </p>

        <div className={styles.divider} />

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span>📋 Total Tasks</span>

            <strong>
              {totalTasks}
            </strong>
          </div>

          <div className={styles.statItem}>
            <span>
              ✅ Completed Tasks
            </span>

            <strong>
              {completedTasks}
            </strong>
          </div>

          <div className={styles.statItem}>
            <span>📝 Total Notes</span>

            <strong>
              {totalNotes}
            </strong>
          </div>
        </div>

        <div className={styles.divider} />

        <div
          className={styles.accountStatus}
        >
          <span>
            Account Status
          </span>

          <strong>
            Authenticated ✅
          </strong>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;