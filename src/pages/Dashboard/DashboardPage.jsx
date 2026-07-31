import DashboardHero from "./components/DashboardHero";
import ContinueWorking from "./components/ContinueWorking";
import ProgressOverview from "./components/ProgressOverview";

import styles from "./Dashboard.module.css";

function DashboardPage() {
  /* =========================
     Local Storage Data
  ========================= */

  const tasks =
    JSON.parse(
      localStorage.getItem("tasks")
    ) || [];

  const notes =
    JSON.parse(
      localStorage.getItem("notes")
    ) || [];

  /* =========================
     Continue Working Data
  ========================= */

  const latestTask = [...tasks].sort(
    (a, b) =>
      new Date(
        b.updatedAt ||
          b.createdAt
      ) -
      new Date(
        a.updatedAt ||
          a.createdAt
      )
  )[0];

  const latestNote = [...notes].sort(
    (a, b) =>
      new Date(
        b.updatedAt ||
          b.createdAt
      ) -
      new Date(
        a.updatedAt ||
          a.createdAt
      )
  )[0];

  /* =========================
     Progress Overview Data
  ========================= */

  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "completed"
    ).length;

  return (
    <main className={styles.dashboard}>
      <div className={styles.content}>
        {/* =========================
            Dashboard Hero
        ========================= */}

        <DashboardHero />

        {/* =========================
            Continue Working
        ========================= */}

        <ContinueWorking
          latestTask={latestTask}
          latestNote={latestNote}
        />

        {/* =========================
            Progress Overview
        ========================= */}

        <ProgressOverview
          totalTasks={totalTasks}
          completedTasks={
            completedTasks
          }
        />

        {/* =========================
            Active Tasks
        ========================= */}

        {/* <ActiveTasks /> */}

        {/* =========================
            High Priority Tasks
        ========================= */}

        {/* <HighPriorityTasks /> */}

        {/* =========================
            Task Status Chart
        ========================= */}

        {/* <TaskStatusChart /> */}

        {/* =========================
            Productivity Chart
        ========================= */}

        {/* <ProductivityChart /> */}

        {/* =========================
            Recent Activity
        ========================= */}

        {/* <RecentActivity /> */}

        {/* =========================
            Quick Actions
        ========================= */}

        {/* <QuickActions /> */}
      </div>
    </main>
  );
}

export default DashboardPage;