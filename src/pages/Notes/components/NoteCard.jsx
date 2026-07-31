import styles from "../Notes.module.css";

function NoteCard({
  note,
  onEdit,
  onDelete,
  onPin,
  selected,
  onSelect,
}) {
  return (
    <div
      className={`${styles.noteCard} ${
        note.pinned
          ? styles.pinnedCard
          : ""
      }`}
    >
      <div className={styles.noteHeader}>
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
        />

        <h3 className={styles.noteTitle}>
          {note.title}
        </h3>

        <button
          className={styles.pinButton}
          onClick={onPin}
        >
          {note.pinned
            ? "📌"
            : "📍"}
        </button>
      </div>

      <p className={styles.noteText}>
        {note.content}
      </p>

      <div className={styles.noteMeta}>
        <span>
          Created: {note.createdAt}
        </span>

        {note.updatedAt && (
          <span>
            Updated: {note.updatedAt}
          </span>
        )}
      </div>

      <div className={styles.noteActions}>
        <button
          className={styles.editButton}
          onClick={onEdit}
        >
          Edit
        </button>

        <button
          className={styles.deleteButton}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;