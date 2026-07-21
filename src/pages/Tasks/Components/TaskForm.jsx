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

  setError,

  handleSubmit,
}) {
  return (
    <div className={styles.form}>
      
{/* ===== Task Input ===== */}
      <Input
        placeholder="Enter task title"
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
      
{/* ===== Due Date Input ===== */}
      <Input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

{/* ====== Priority Selector ====== */}
      <div className={styles.prioritySelector}>
        <button
          type="button"
          className={`${styles.priorityOption} ${
            priority === "high"
              ? styles.highActive
              : ""
          }`}
          onClick={() => setPriority("high")}
        >
          High
        </button>

        <button
          type="button"
          className={`${styles.priorityOption} ${
            priority === "medium"
              ? styles.mediumActive
              : ""
          }`}
          onClick={() => setPriority("medium")}
        >
          Medium
        </button>

        <button
          type="button"
          className={`${styles.priorityOption} ${
            priority === "low"
              ? styles.lowActive
              : ""
          }`}
          onClick={() => setPriority("low")}
        >
          Low
        </button>
      </div>

{/* ===== Add Task Button ===== */}
      <Button onClick={handleSubmit}>
        Add Task
      </Button>
    </div>
  );
}

export default TaskForm;