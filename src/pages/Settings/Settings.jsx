import { useEffect, useState } from "react";

import ProfileSection from "./components/ProfileSection";
import AppearanceSection from "./components/AppearanceSection";
import PreferencesSection from "./components/PreferencesSection";
import DataSection from "./components/DataSection";
import AboutSection from "./components/AboutSection";

import { useAuth } from "../../context/AuthContext";

import styles from "./Settings.module.css";

function Settings() {
  /* =========================
     Current User
  ========================= */

  const { user, setUser } =
    useAuth();

  /* =========================
     Appearance State
  ========================= */

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      "light"
  );

  /* =========================
     Preference State
  ========================= */

  const [startPage, setStartPage] =
    useState(
      localStorage.getItem(
        "startPage"
      ) || "dashboard"
    );

  /* =========================
     Save Page Preference
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "startPage",
      startPage
    );
  }, [startPage]);

  /* =========================
     Tasks & Notes Statistics
  ========================= */

  const tasks =
    JSON.parse(
      localStorage.getItem("tasks")
    ) || [];

  const notes =
    JSON.parse(
      localStorage.getItem("notes")
    ) || [];

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const totalNotes = notes.length;

  /* =========================
     Save Theme
  ========================= */

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  /* =========================
     Data Management
  ========================= */

  const handleClearTasks = () => {
    localStorage.removeItem("tasks");
  };

  const handleClearNotes = () => {
    localStorage.removeItem("notes");
  };

  const handleResetData = () => {
    localStorage.clear();
  };

  return (
    <main className={styles.settings}>
      <div className={styles.header}>
        <h1>Settings</h1>

        <p>
          Manage your profile and
          application preferences.
        </p>
      </div>

      <div className={styles.sections}>
        <ProfileSection
          user={user}
          setUser={setUser}
          totalTasks={totalTasks}
          completedTasks={
            completedTasks
          }
          totalNotes={totalNotes}
        />

        <AppearanceSection
          theme={theme}
          setTheme={setTheme}
        />

        <PreferencesSection
          startPage={startPage}
          setStartPage={setStartPage}
        />

        <DataSection
          handleClearTasks={
            handleClearTasks
          }
          handleClearNotes={
            handleClearNotes
          }
          handleResetData={
            handleResetData
          }
        />

        <AboutSection />
      </div>
    </main>
  );
}

export default Settings;