import { useState, useEffect } from "react";

import styles from "../Settings.module.css";

function DataSection({
  handleClearTasks,
  handleClearNotes,
  handleResetData,
}) {
  const [actionType, setActionType] =
    useState(null);

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleConfirm = () => {
    if (actionType === "tasks") {
      handleClearTasks();

      setSuccessMessage(
        "All tasks have been deleted successfully."
      );
    }

    if (actionType === "notes") {
      handleClearNotes();

      setSuccessMessage(
        "All notes have been deleted successfully."
      );
    }

    if (actionType === "reset") {
      handleResetData();

      setSuccessMessage(
        "Application data has been reset successfully."
      );
    }

    setActionType(null);
  };

  useEffect(() => {
  if (successMessage) {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 1000);

    return () => clearTimeout(timer);
  }
}, [successMessage]);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Data & Storage</h2>

        <p>
          Manage and remove application
          data.
        </p>
      </div>

      <div className={styles.dataCards}>
        <div
          className={styles.dataCard}
          onClick={() =>
            setActionType("tasks")
          }
        >
          <h3>📋 Clear Tasks</h3>

          <p>
            Remove all saved tasks from
            the application.
          </p>
        </div>

        <div
          className={styles.dataCard}
          onClick={() =>
            setActionType("notes")
          }
        >
          <h3>📝 Clear Notes</h3>

          <p>
            Remove all saved notes from
            the application.
          </p>
        </div>

        <div
          className={`${styles.dataCard} ${styles.dangerCard}`}
          onClick={() =>
            setActionType("reset")
          }
        >
          <h3>
            ⚠️ Reset Application
          </h3>

          <p>
            Delete all application data
            and preferences.
          </p>
        </div>
      </div>

      {actionType && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>
              {actionType === "tasks" &&
                "Clear Tasks"}

              {actionType === "notes" &&
                "Clear Notes"}

              {actionType === "reset" &&
                "Reset Application"}
            </h3>

            <p>
              {actionType === "tasks" &&
                "Are you sure you want to delete all tasks?"}

              {actionType === "notes" &&
                "Are you sure you want to delete all notes?"}

              {actionType === "reset" &&
                "This action cannot be undone. All application data will be deleted."}
            </p>

            <div
              className={
                styles.modalActions
              }
            >
              <button
                className={
                  styles.cancelButton
                }
                onClick={() =>
                  setActionType(null)
                }
              >
                Cancel
              </button>

              <button
                className={
                  styles.confirmButton
                }
                onClick={handleConfirm}
              >
                {actionType === "reset"
                  ? "Reset"
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>✅ Success</h3>

            <p>{successMessage}</p>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default DataSection;