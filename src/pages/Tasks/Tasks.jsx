import { useState, useEffect } from "react";

import {
  Check,
  Pencil,
  Trash2,
} from "lucide-react";

import styles from "./Tasks.module.css";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

function Tasks() {
  const [taskTitle, setTaskTitle] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  const [error, setError] = useState("");

  const [editingTaskId, setEditingTaskId] =
    useState(null);

  const [editValue, setEditValue] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const handleSubmit = () => {
    if (!taskTitle.trim()) {
      setError("Please enter a task first.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");

    setError("");
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== taskId
    );

    setTasks(updatedTasks);
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);

    setEditValue(task.title);
  };

  const handleSaveTask = () => {
    if (!editValue.trim()) return;

    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId
        ? {
            ...task,
            title: editValue,
          }
        : task
    );

    setTasks(updatedTasks);

    setEditingTaskId(null);

    setEditValue("");
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    totalTasks - completedTasks;

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

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span>Total</span>
          <strong>{totalTasks}</strong>
        </div>

        <div className={styles.statCard}>
          <span>Completed</span>
          <strong>{completedTasks}</strong>
        </div>

        <div className={styles.statCard}>
          <span>Pending</span>
          <strong>{pendingTasks}</strong>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.form}>
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

          <Button onClick={handleSubmit}>
            Add Task
          </Button>
        </div>

        {error && (
          <p className={styles.errorMessage}>
            {error}
          </p>
        )}

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
            <div className={styles.taskInfo}>
              <button
                className={`${styles.checkButton} ${
                  task.completed
                    ? styles.checkButtonActive
                    : ""
                }`}
                onClick={() =>
                  handleToggleTask(task.id)
                }
              >
                {task.completed && (
                  <Check
                    size={16}
                    strokeWidth={3}
                  />
                )}
              </button>

              {editingTaskId === task.id ? (
                <Input
                  value={editValue}
                  onChange={(e) =>
                    setEditValue(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveTask();
                    }
                  }}
                  onBlur={handleSaveTask}
                />
              ) : (
                <span
                  className={
                    task.completed
                      ? styles.completedTask
                      : ""
                  }
                >
                  {task.title}
                </span>
              )}
            </div>

            <div className={styles.actions}>
              {editingTaskId !== task.id && (
                <>
                  <button
                    className={styles.actionButton}
                    onClick={() =>
                      handleEditTask(task)
                    }
                  >
                    <Pencil size={22} strokeWidth={3} />
                  </button>

                  <button
                    className={`${styles.actionButton} ${styles.deleteAction}`}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash2 size={22} strokeWidth={3} />
                  </button>

                 </>
              )}
            </div>
          </div>
        ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Tasks;