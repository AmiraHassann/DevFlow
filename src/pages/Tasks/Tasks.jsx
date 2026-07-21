import { useState, useEffect, useRef } from "react";

import {
  Check,
  Pencil,
  Trash2
} from "lucide-react";

import styles from "./Tasks.module.css";
import TaskToolbar from "./components/TaskToolbar";
import TaskStats from "./components/TaskStats";
import TaskForm from "./components/TaskForm";

import Modal from "../../components/ui/Modal/Modal";

function Tasks() {
  const [taskTitle, setTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] =
  useState("");

  const [isStatusOpen, setIsStatusOpen] =
  useState(false);

  const [isPriorityOpen, setIsPriorityOpen] =
  useState(false);

  const [priority, setPriority] =
  useState("medium");

  const [priorityFilter, setPriorityFilter] =
  useState("all");
  

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  const [error, setError] = useState("");

  const statusRef = useRef(null);
  const priorityRef = useRef(null);

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

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      statusRef.current &&
      !statusRef.current.contains(event.target)
    ) {
      setIsStatusOpen(false);
    }

    if (
      priorityRef.current &&
      !priorityRef.current.contains(event.target)
    ) {
      setIsPriorityOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  const handleSubmit = () => {
    if (!taskTitle.trim()) {
      setError("Please enter a task first.");
      return;
    }

    const newTask = {
    id: Date.now(),
    title: taskTitle,
    completed: false,
    priority,
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");

    setPriority("medium");

    setError("");
  };

  const [isModalOpen, setIsModalOpen] =
  useState(false);

  const [selectedTaskId, setSelectedTaskId] =
  useState(null);

  const handleDeleteTask = (taskId) => {
    setIsModalOpen(true);
    setSelectedTaskId(taskId);
  };

  const confirmDeleteTask = () => {
  const updatedTasks = tasks.filter(
    (task) => task.id !== selectedTaskId
  );

  setTasks(updatedTasks);

  setSelectedTaskId(null);

  setIsModalOpen(false); 
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
  const matchesStatus =
    filter === "completed"
      ? task.completed
      : filter === "pending"
      ? !task.completed
      : true;

  const matchesSearch =
    task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesPriority =
    priorityFilter === "all"
      ? true
      : task.priority === priorityFilter;

  return (
    matchesStatus &&
    matchesSearch &&
    matchesPriority
  );
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
{/* ============= Stats ============ */}
      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />
{/* ============= Toolbar ============ */}
      <TaskToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        isStatusOpen={isStatusOpen}
        setIsStatusOpen={setIsStatusOpen}
        isPriorityOpen={isPriorityOpen}
        setIsPriorityOpen={setIsPriorityOpen}
        statusRef={statusRef}
        priorityRef={priorityRef}
      />

      <div className={styles.content}>
{/* ===== Task Form ===== */}
      <TaskForm
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        priority={priority}
        setPriority={setPriority}
        setError={setError}
        handleSubmit={handleSubmit}
      />
{/* ===== Task List ===== */}
        {error && (
          <p className={styles.errorMessage}>
            {error}
          </p>
        )}

        {filteredTasks.length === 0 ? (
         <div className={styles.emptyState}>
          {searchTerm
            ? "No matching tasks found."
            : filter === "completed"
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
              <>
                <span
                  className={
                    task.completed
                      ? styles.completedTask
                      : ""
                  }
                >
                  {task.title}
                </span>

                <div
                  className={`${styles.priorityBadge} ${
                    styles[task.priority]
                  }`}
                >
                  {task.priority}
                </div>
              </>
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
      {isModalOpen && (
      <Modal
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onConfirm={confirmDeleteTask}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTaskId(null);
        }}
      />
    )}
    </main>
  );
}

export default Tasks;