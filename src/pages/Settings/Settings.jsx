import { useEffect, useState } from "react";

import ProfileSection from "./components/ProfileSection";
import AppearanceSection from "./components/AppearanceSection";
import LanguageSection from "./components/LanguageSection";
import DataSection from "./components/DataSection";
import AboutSection from "./components/AboutSection";

import { auth } from "../../firebase/config";

import styles from "./Settings.module.css";

function Settings() {
  /* =========================
     Current User
  ========================= */

  const user = auth.currentUser;

  /* =========================
     Appearance State
  ========================= */

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      "light"
  );

  /* =========================
     Language State
  ========================= */

  const [language, setLanguage] =
    useState(
      localStorage.getItem("language") ||
        "en"
    );

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
    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  /* =========================
     Save Language
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "language",
      language
    );
  }, [language]);

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

        <LanguageSection
          language={language}
          setLanguage={setLanguage}
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