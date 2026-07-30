import styles from "../Settings.module.css";

function AboutSection() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>About</h2>

        <p>
          Information about the
          application.
        </p>
      </div>

      <div className={styles.aboutInfo}>
        <div className={styles.aboutItem}>
          <span>Application</span>

          <strong>TaskFlow</strong>
        </div>

        <div className={styles.aboutItem}>
          <span>Version</span>

          <strong>1.0.0</strong>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;