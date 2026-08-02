import DashboardHero from "./components/DashboardHero";
import ContinueWorking from "./components/ContinueWorking";
import ProgressOverview from "./components/ProgressOverview";
import TaskPriorityChart from "./components/TaskPriorityChart";
import ProductivityChart from "./components/ProductivityChart";
import RecentActivity from "./components/RecentActivity";

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

  const activities =
    JSON.parse(
      localStorage.getItem("activities")
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
      (task) => task.completed
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
            High Priority Tasks
        ========================= */}

        {/* =========================
            Task Priority Chart
        ========================= */}

        <TaskPriorityChart tasks={tasks} />

        {/* =========================
            Productivity Chart
        ========================= */}

        <ProductivityChart tasks={tasks} />

        {/* =========================
            Recent Activity
        ========================= */}

        <RecentActivity
          activities={activities}
        />

        {/* =========================
            Quick Actions
        ========================= */}

      </div>
    </main>
  );
}

export default DashboardPage;