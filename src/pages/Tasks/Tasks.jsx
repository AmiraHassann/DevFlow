import { useState, useEffect, useRef } from "react";

import styles from "./Tasks.module.css";

import TaskToolbar from "./components/TaskToolbar";
import TaskStats from "./components/TaskStats";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import Modal from "../../components/ui/Modal/Modal";

function Tasks() {

  /* =========================
     Form State
  ========================= */

  const [taskTitle, setTaskTitle] =
    useState("");

  const [priority, setPriority] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [isCreateTaskOpen, setIsCreateTaskOpen] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================
     Filter State
  ========================= */

  const [filter, setFilter] =
    useState("all");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("all");

  /* =========================
     Popover State
  ========================= */

  const [isStatusOpen, setIsStatusOpen] =
    useState(false);

  const [isPriorityOpen, setIsPriorityOpen] =
    useState(false);

  /* =========================
     Edit State
  ========================= */

  const [isEditTaskOpen, setIsEditTaskOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  /* =========================
     Modal State
  ========================= */

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedTaskId, setSelectedTaskId] =
    useState(null);

  /* =========================
     Refs
  ========================= */

  const statusRef = useRef(null);

  const priorityRef = useRef(null);

  /* =========================
     Tasks State
  ========================= */

  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  /* =========================
     Local Storage Effect
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  /* =========================
     Close Popovers
  ========================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        statusRef.current &&
        !statusRef.current.contains(
          event.target
        )
      ) {
        setIsStatusOpen(false);
      }

      if (
        priorityRef.current &&
        !priorityRef.current.contains(
          event.target
        )
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

  /* =========================
     Add Task
  ========================= */

  const handleSubmit = () => {
    if (!taskTitle.trim()) {
      setError(
        "Please enter a task first."
      );
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
      priority,
      dueDate,
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");

    setDueDate("");

    setPriority("medium");

    setError("");
  };

  /* =========================
     Delete Task
  ========================= */

  const handleDeleteTask = (
    taskId
  ) => {
    setIsModalOpen(true);

    setSelectedTaskId(taskId);
  };

  const confirmDeleteTask = () => {
    const updatedTasks = tasks.filter(
      (task) =>
        task.id !== selectedTaskId
    );

    setTasks(updatedTasks);

    setSelectedTaskId(null);

    setIsModalOpen(false);
  };

  /* =========================
     Toggle Task
  ========================= */

  const handleToggleTask = (
    taskId
  ) => {
    const updatedTasks = tasks.map(
      (task) =>
        task.id === taskId
          ? {
            ...task,
            completed:
              !task.completed,
          }
          : task
    );

    setTasks(updatedTasks);
  };

  /* =========================
     Edit Task
  ========================= */

  const handleEditTask = (task) => {
    setEditingTask(task);

    setTaskTitle(task.title);

    setPriority(task.priority);

    setDueDate(task.dueDate);

    setIsEditTaskOpen(true);
  };

  const handleUpdateTask = () => {
    if (!taskTitle.trim()) return;

    const updatedTasks = tasks.map(
      (task) =>
        task.id === editingTask.id
          ? {
            ...task,
            title: taskTitle,
            priority,
            dueDate,
          }
          : task
    );

    setTasks(updatedTasks);

    setEditingTask(null);

    setIsEditTaskOpen(false);

    setTaskTitle("");

    setPriority("");

    setDueDate("");
  };

  /* =========================
     Statistics
  ========================= */

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const pendingTasks =
    totalTasks - completedTasks;

  /* =========================
     Filtered Tasks
  ========================= */

  const filteredTasks =
    tasks.filter((task) => {
      const matchesStatus =
        filter === "completed"
          ? task.completed
          : filter === "pending"
            ? !task.completed
            : true;

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesPriority =
        priorityFilter === "all"
          ? true
          : task.priority ===
          priorityFilter;

      return (
        matchesStatus &&
        matchesSearch &&
        matchesPriority
      );
    });


  return (
    <main className={styles.tasks}>

      {/* ===== Header ===== */}
      <div className={styles.header}>
        <div>
          <h1>Tasks</h1>

          <p>
            Manage and organize your daily
            tasks.
          </p>
        </div>

        <button
          className={styles.createTaskButton}
          onClick={() =>
            setIsCreateTaskOpen(true)
          }
        >
          + Create New Task
        </button>
      </div>

      {/* ===== Stats ===== */}
      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      {/* ===== Toolbar ===== */}
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

      {/* ===== Content ===== */}
      <div className={styles.content}>

        {/* ===== Task List ===== */}
        <TaskList
          filteredTasks={filteredTasks}
          searchTerm={searchTerm}
          filter={filter}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleToggleTask={handleToggleTask}
        />
      </div>
      {/* ===== Task Form ===== */}
      {isCreateTaskOpen && (
        <Modal
          onClose={() =>
            setIsCreateTaskOpen(false)
          }
        >
          <TaskForm
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            priority={priority}
            setPriority={setPriority}
            dueDate={dueDate}
            setDueDate={setDueDate}
            error={error}
            setError={setError}
            handleSubmit={() => {
              if (!taskTitle.trim()) {
                setError(
                  "Please enter a task first."
                );
                return;
              }

              handleSubmit();
              setIsCreateTaskOpen(false);
            }}
          />
        </Modal>
      )}

      {/* ===== Edit Task Modal ===== */}
      {isEditTaskOpen && (
        <Modal
          onClose={() => {
            setIsEditTaskOpen(false);
            setEditingTask(null);
          }}
        >
          <TaskForm
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            priority={priority}
            setPriority={setPriority}
            dueDate={dueDate}
            setDueDate={setDueDate}
            error={error}
            setError={setError}
            handleSubmit={handleUpdateTask}
          />
        </Modal>
      )}

      {/* ===== Delete Modal ===== */}
      {isModalOpen && (
        <Modal
          title="Delete Task"
          message="Are you sure you want to delete this task?"
          onConfirm={
            confirmDeleteTask
          }
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTaskId(
              null
            );
          }}
        />
      )}
    </main>
  );
}

export default Tasks;