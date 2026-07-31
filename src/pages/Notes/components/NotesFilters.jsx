import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import styles from "../Notes.module.css";

function NotesFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  showSortMenu,
  setShowSortMenu,
  sortRef,
}) {
  return (
    <div className={styles.filters}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className={styles.searchInput}
        />
      </div>

      <div
        className={styles.sortContainer}
        ref={sortRef}
      >
        <button
          className={styles.sortButton}
          onClick={() =>
            setShowSortMenu(
              !showSortMenu
            )
          }
        >
          <span>
            {sortBy === ""
              ? "Sort"
              : sortBy === "newest"
              ? "Newest First"
              : sortBy === "oldest"
              ? "Oldest First"
              : "Recently Updated"}
          </span>

          {showSortMenu ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>

        {showSortMenu && (
          <div className={styles.sortMenu}>
            <button
              onClick={() => {
                setSortBy("newest");
                setShowSortMenu(false);
              }}
            >
              Newest First
            </button>

            <button
              onClick={() => {
                setSortBy("oldest");
                setShowSortMenu(false);
              }}
            >
              Oldest First
            </button>

            <button
              onClick={() => {
                setSortBy("updated");
                setShowSortMenu(false);
              }}
            >
              Recently Updated
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesFilters;