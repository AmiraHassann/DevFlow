import { auth } from "../../../firebase/config";
import styles from "../Dashboard.module.css";

function DashboardHero() {
  const currentHour =
    new Date().getHours();

  let greeting =
    "Good Evening";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting =
      "Good Afternoon";
  }

  const today =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "short",
        day: "numeric",
      }
    );

  const userName =
    auth.currentUser?.displayName ||
    "User";

  return (
    <section className={styles.hero}>
      <span className={styles.heroBadge}>
        Dashboard
      </span>

      <h1>
        {greeting}, {userName} 👋
      </h1>

      <p className={styles.heroWelcome}>
        Welcome back to DevFlow.
      </p>

      <span className={styles.heroDate}>
        📅 {today}
      </span>
    </section>
  );
}

export default DashboardHero;