import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

          <DatePicker
            selected={
              dueDate ? new Date(dueDate) : null
            }

            onChange={(date) =>
              setDueDate(
                date
                  ? date
                    .toISOString()
                    .split("T")[0]
                  : ""
              )
            }

            placeholderText="Select due date"
            className={styles.dateInput}
            dateFormat="dd/MM/yyyy"

            popperModifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 10],
                },
              },
            ]}
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
                    className={`${styles.dropdownItem} ${item === priority
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