import Button from "../../../components/ui/Button/Button";

import styles from "../Settings.module.css";

function DataSection({
  handleClearTasks,
  handleClearNotes,
  handleResetData,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Data Management</h2>

        <p>
          Manage and remove application
          data.
        </p>
      </div>

      <div className={styles.dataActions}>
        <Button onClick={handleClearTasks}>
          Clear Tasks
        </Button>

        <Button onClick={handleClearNotes}>
          Clear Notes
        </Button>

        <Button
          onClick={handleResetData}
        >
          Reset All Data
        </Button>
      </div>
    </div>
  );
}

export default DataSection;