import { useState } from "react";

import styles from "./Tasks.module.css";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

function Tasks() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = () => {
  if (!taskTitle.trim()) return;

  const newTask = {
    id: Date.now(),
    title: taskTitle,
  };

  setTasks([...tasks, newTask]);

  setTaskTitle("");
};

  return (
    <main className={styles.tasks}>
      <div className={styles.header}>
        <div>
          <h1>Tasks</h1>

          <p>
            Manage and organize your daily tasks.
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.form}>
          <Input
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) =>
              setTaskTitle(e.target.value)
            }
          />

          <Button onClick={handleSubmit}>
            Add Task
          </Button>
        </div>

        {tasks.length === 0 ? (
  <div className={styles.emptyState}>
    No tasks available yet.
  </div>
) : (
  <div className={styles.taskList}>
    {tasks.map((task) => (
      <div
        key={task.id}
        className={styles.taskCard}
      >
        {task.title}
      </div>
    ))}
  </div>
)}
      </div>
    </main>
  );
}

export default Tasks;