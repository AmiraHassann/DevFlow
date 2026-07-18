import { useState, useEffect } from "react";

import {
  Check,
  Pencil,
  Trash2,
} from "lucide-react";

import styles from "./Tasks.module.css";
import Swal from "sweetalert2";

import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

function Tasks() {
  const [taskTitle, setTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");

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
  Swal.fire({
    title: "Delete Task?",
    text: "This action cannot be undone.",
    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",

    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedTasks = tasks.filter(
        (task) => task.id !== taskId
      );

      setTasks(updatedTasks);

      Swal.fire({
        title: "Deleted!",
        text: "The task has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
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

  const filteredTasks = tasks.filter((task) => {
  if (filter === "completed") {
    return task.completed;
  }

  if (filter === "pending") {
    return !task.completed;
  }

  return true;
  });  

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

      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${
            filter === "all" ? styles.activeFilter : ""
          }`}
          onClick={() => setFilter("all")}
        >
          All Tasks
        </button>

        <button
          className={`${styles.filterButton} ${
            filter === "completed" ? styles.activeFilter : ""
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

        <button
          className={`${styles.filterButton} ${
            filter === "pending" ? styles.activeFilter : ""
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
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

        {filteredTasks.length === 0 ? (
          <div className={styles.emptyState}>
            {filter === "completed"
            ? "No completed tasks found."
            : filter === "pending"
            ? "No pending tasks found."
            : "No tasks available yet."}
          </div>
        ) : (
          <div className={styles.taskList}>
            {filteredTasks.map((task) => (
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