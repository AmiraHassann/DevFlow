import { useEffect, useState } from "react";

import ProfileSection from "./components/ProfileSection";
import AppearanceSection from "./components/AppearanceSection";
import LanguageSection from "./components/LanguageSection";
import DataSection from "./components/DataSection";
import AboutSection from "./components/AboutSection";

import styles from "./Settings.module.css";

function Settings() {
  /* =========================
     Profile Settings State
  ========================= */

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

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
     Load Saved Data
  ========================= */

  useEffect(() => {
    const savedName =
      localStorage.getItem("userName");

    const savedEmail =
      localStorage.getItem("userEmail");

    if (savedName) {
      setName(savedName);
    }

    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

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
     Save Settings
  ========================= */

  const handleSaveChanges = () => {
    localStorage.setItem(
      "userName",
      name
    );

    localStorage.setItem(
      "userEmail",
      email
    );

    alert("Settings saved successfully.");
  };

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
      {/* ===== Header ===== */}
      <div className={styles.header}>
        <h1>Settings</h1>

        <p>
          Manage your profile and
          application preferences.
        </p>
      </div>

      {/* ===== Sections ===== */}
      <div className={styles.sections}>
        {/* Profile */}
        <ProfileSection
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          handleSaveChanges={
            handleSaveChanges
          }
        />

        {/* Appearance */}
        <AppearanceSection
          theme={theme}
          setTheme={setTheme}
        />

        {/* Language */}
        <LanguageSection
          language={language}
          setLanguage={setLanguage}
        />

        {/* Data Management */}
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

        {/* About */}
        <AboutSection />
      </div>
    </main>
  );
}

export default Settings;