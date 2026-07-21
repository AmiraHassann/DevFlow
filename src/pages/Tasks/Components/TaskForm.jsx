import { useState } from "react";

import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";

import styles from "../Tasks.module.css";

function TaskForm({
  taskTitle,
  setTaskTitle,

  priority,
  setPriority,

  dueDate,
  setDueDate,

  error,
  setError,

  handleSubmit,
}) {
  const [isPriorityOpen, setIsPriorityOpen] =
    useState(false);

  return (
    <div className={styles.taskFormCard}>
      {/* Task Title */}
      <div className={styles.formGroup}>
        <label>Task Title</label>

        <Input
          placeholder="Enter task title..."
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </div>

      {/* Due Date & Priority */}
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Due Date</label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className={styles.dateInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Priority</label>

          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.dropdownButton}
              onClick={() =>
                setIsPriorityOpen(
                  !isPriorityOpen
                )
              }
            >
              {priority
                ? priority
                    .charAt(0)
                    .toUpperCase() +
                  priority.slice(1)
                : "Choose Priority"}
            </button>

            {isPriorityOpen && (
              <div
                className={styles.dropdownMenu}
              >
                {[
                  "high",
                  "medium",
                  "low",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`${styles.dropdownItem} ${
                      item === priority
                        ? styles.activeOption
                        : ""
                    }`}
                    onClick={() => {
                      setPriority(item);
                      setIsPriorityOpen(
                        false
                      );
                    }}
                  >
                    {item
                      .charAt(0)
                      .toUpperCase() +
                      item.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className={styles.errorMessage}>
          {error}
        </p>
      )}

      {/* Submit */}
      <div className={styles.formActions}>
        <Button onClick={handleSubmit}>
          Create Task
        </Button>
      </div>
    </div>
  );
}

export default TaskForm;