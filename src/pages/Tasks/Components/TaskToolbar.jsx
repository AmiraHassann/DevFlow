import {
  ChevronDown,
  ListFilter,
  Flag,
} from "lucide-react";

import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";

import styles from "../Tasks.module.css";

function TaskToolbar({
  searchTerm,
  setSearchTerm,

  filter,
  setFilter,

  priorityFilter,
  setPriorityFilter,

  isStatusOpen,
  setIsStatusOpen,

  isPriorityOpen,
  setIsPriorityOpen,

  statusRef,
  priorityRef,
}) {
  return (
    <div className={styles.toolbar}>

{/* ===== Search ===== */}
      <Input
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

{/* ===== Filters ===== */}
      <div className={styles.toolbarFilters}>

{/* ===== Status Filter ===== */}
        <div
          ref={statusRef}
          className={`${styles.filterCard} ${
            isStatusOpen
              ? styles.filterCardActive
              : ""
          }`}
        >
          <button
            className={styles.filterCardButton}
            onClick={() =>
              setIsStatusOpen(!isStatusOpen)
            }
          >
            <ListFilter size={16} />

            {filter === "all"
              ? "Status"
              : filter.charAt(0).toUpperCase() +
                filter.slice(1)}

            <ChevronDown
              size={16}
              className={
                isStatusOpen
                  ? styles.chevronOpen
                  : styles.chevron
              }
            />
          </button>

          {isStatusOpen && (
            <div className={styles.popover}>
              <button
                onClick={() => {
                  setFilter("all");
                  setIsStatusOpen(false);
                }}
              >
                All
              </button>

              <button
                onClick={() => {
                  setFilter("completed");
                  setIsStatusOpen(false);
                }}
              >
                Completed
              </button>

              <button
                onClick={() => {
                  setFilter("pending");
                  setIsStatusOpen(false);
                }}
              >
                Pending
              </button>
            </div>
          )}
        </div>

{/* ===== Priority Filter ===== */}
        <div
          ref={priorityRef}
          className={`${styles.filterCard} ${
            isPriorityOpen
              ? styles.filterCardActive
              : ""
          }`}
        >
          <button
            className={styles.filterCardButton}
            onClick={() =>
              setIsPriorityOpen(!isPriorityOpen)
            }
          >
            <Flag size={16} />

            {priorityFilter === "all"
              ? "Priority"
              : priorityFilter.charAt(0).toUpperCase() +
                priorityFilter.slice(1)}

            <ChevronDown
              size={16}
              className={
                isPriorityOpen
                  ? styles.chevronOpen
                  : styles.chevron
              }
            />
          </button>

          {isPriorityOpen && (
            <div className={styles.popover}>
              <button
                onClick={() => {
                  setPriorityFilter("all");
                  setIsPriorityOpen(false);
                }}
              >
                All
              </button>

              <button
                onClick={() => {
                  setPriorityFilter("high");
                  setIsPriorityOpen(false);
                }}
              >
                High
              </button>

              <button
                onClick={() => {
                  setPriorityFilter("medium");
                  setIsPriorityOpen(false);
                }}
              >
                Medium
              </button>

              <button
                onClick={() => {
                  setPriorityFilter("low");
                  setIsPriorityOpen(false);
                }}
              >
                Low
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default TaskToolbar;