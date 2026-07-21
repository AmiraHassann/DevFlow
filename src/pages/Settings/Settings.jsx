import { useEffect, useState } from "react";

import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

import styles from "./Settings.module.css";

function Settings() {
  /* =========================
     Profile Settings
  ========================= */

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  return (
    <main className={styles.settings}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Settings</h1>

        <p>
          Manage your profile and
          application preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className={styles.card}>
        <h2>Profile Settings</h2>

        <div className={styles.formGroup}>
          <label>Full Name</label>

          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email Address</label>

          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className={styles.actions}>
          <Button
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Settings;