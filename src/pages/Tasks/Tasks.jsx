import { useState, useEffect, useRef } from "react";

import styles from "./Tasks.module.css";

import { logActivity }
  from "../../utils/activityLogger";

import TaskToolbar from "./temp/TaskToolbar";
import TaskStats from "./temp/TaskStats";
import TaskForm from "./temp/TaskForm";
import TaskList from "./temp/TaskList";
import TrashedTasks from "./temp/TrashedTasks";

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

  const [showTrash, setShowTrash] =
    useState(false);

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

  const [trashedTasks, setTrashedTasks] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "trashedTasks"
          )
        ) || []
      );
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

  useEffect(() => {
    localStorage.setItem(
      "trashedTasks",
      JSON.stringify(
        trashedTasks
      )
    );
  }, [trashedTasks]);
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

      createdAt:
        new Date().toLocaleString(),

      updatedAt: null,
    };

    setTasks([...tasks, newTask]);

    logActivity(
      "Created Task",
      taskTitle
    );

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
    const taskToTrash =
      tasks.find(
        (task) =>
          task.id === selectedTaskId
      );

    if (taskToTrash) {
      logActivity(
        "Deleted Task",
        taskToTrash.title
      );
      setTrashedTasks(
        (prev) => [
          taskToTrash,
          ...prev,
        ]
      );
    }

    setTasks(
      tasks.filter(
        (task) =>
          task.id !== selectedTaskId
      )
    );

    setSelectedTaskId(null);

    setIsModalOpen(false);
  };

  const handleRestoreTask = (
    task
  ) => {
    setTasks((prev) => [
      task,
      ...prev,
    ]);

    setTrashedTasks((prev) =>
      prev.filter(
        (item) =>
          item.id !== task.id
      )
    );
    
    logActivity(
      "Restored Task",
      task.title
    );
  };

  const handleDeleteForever = (
    id
  ) => {
    setTrashedTasks((prev) =>
      prev.filter(
        (task) =>
          task.id !== id
      )
    );
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

            updatedAt:
              new Date().toLocaleString(),
          }

          : task
    );

    setTasks(updatedTasks);

    logActivity(
      "Updated Task",
      taskTitle
    );

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

        <div className={styles.headerActions}>
          <button
            className={styles.trashButton}
            onClick={() =>
              setShowTrash(true)
            }
          >
            🗑️ Trash

            {trashedTasks.length > 0 && (
              <span className={styles.trashCount}>
                {trashedTasks.length}
              </span>
            )}
          </button>

          <button
            className={styles.createTaskButton}
            onClick={() =>
              setIsCreateTaskOpen(true)
            }
          >
            + New Task
          </button>
        </div>
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

      {showTrash && (
        <TrashedTasks
          trashedTasks={trashedTasks}
          onRestore={handleRestoreTask}
          onDeleteForever={
            handleDeleteForever
          }
          onClose={() =>
            setShowTrash(false)
          }
        />
      )}
    </main>
  );
}

export default Tasks;