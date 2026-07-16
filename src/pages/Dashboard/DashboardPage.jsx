import styles from "./Dashboard.module.css";

function DashboardPage() {
  return (
    <main className={styles.dashboard}>
      <div className={styles.content}>
        <h1>Welcome to DevFlow</h1>

        <p>
          Your productivity workspace is ready.
        </p>
      </div>
    </main>
  );
}

export default DashboardPage;