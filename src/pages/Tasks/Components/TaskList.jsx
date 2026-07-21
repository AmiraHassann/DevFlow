import {
  Check,
  Pencil,
  Trash2,
} from "lucide-react";

import Input from "../../../components/ui/Input/Input";

import styles from "../Tasks.module.css";

function TaskList({
  filteredTasks,
  searchTerm,
  filter,

  editingTaskId,
  editValue,
  setEditValue,

  handleSaveTask,
  handleEditTask,
  handleDeleteTask,
  handleToggleTask,
}) {
  return (
    <>
      {/* ===== Empty State ===== */}
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
          {filteredTasks.map((task) => {
            const isOverdue =
              task.dueDate &&
              !task.completed &&
              new Date(task.dueDate) <
              new Date();

            return (
              <div
                key={task.id}
                className={styles.taskCard}
              >
                {/* ===== Task Info ===== */}
                <div className={styles.taskInfo}>
                  <button
                    className={`${styles.checkButton} ${task.completed
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
                        setEditValue(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter"
                        ) {
                          handleSaveTask();
                        }
                      }}
                      onBlur={handleSaveTask}
                    />
                  ) : (
                    <>
                      {/* ===== Task Content ===== */}
                      <div
                        className={
                          styles.taskMeta
                        }
                      >
                        <span
                          className={
                            task.completed
                              ? styles.completedTask
                              : ""
                          }
                        >
                          {task.title}
                        </span>

                        {task.dueDate && (
                          <span
                            className={`${styles.dueDate} ${isOverdue
                                ? styles.overdueDate
                                : ""
                              }`}
                          >
                            📅{" "}
                            {new Date(
                              task.dueDate
                            ).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>

                      {/* ===== Priority Badge ===== */}
                      <div
                        className={`${styles.priorityBadge} ${styles[
                          task.priority
                          ]
                          }`}
                      >
                        {task.priority}
                      </div>
                    </>
                  )}
                </div>

                {/* ===== Actions ===== */}
                <div
                  className={styles.actions}
                >
                  {editingTaskId !==
                    task.id && (
                      <>
                        <button
                          className={
                            styles.actionButton
                          }
                          onClick={() =>
                            handleEditTask(
                              task
                            )
                          }
                        >
                          <Pencil
                            size={22}
                            strokeWidth={3}
                          />
                        </button>

                        <button
                          className={`${styles.actionButton} ${styles.deleteAction}`}
                          onClick={() =>
                            handleDeleteTask(
                              task.id
                            )
                          }
                        >
                          <Trash2
                            size={22}
                            strokeWidth={3}
                          />
                        </button>
                      </>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default TaskList;