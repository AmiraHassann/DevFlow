import styles from "../Notes.module.css";

function TrashModal({
  trashedNotes,
  onClose,
  onRestore,
  onDeleteForever,
}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Trash Bin</h3>

        {trashedNotes.length === 0 ? (
          <p>No deleted notes.</p>
        ) : (
          trashedNotes.map((note) => (
            <div
              key={note.id}
              className={styles.trashItem}
            >
              <strong>
                {note.title}
              </strong>

              <div
                className={
                  styles.modalActions
                }
              >
                <button
                  className={
                    styles.confirmButton
                  }
                  onClick={() =>
                    onRestore(note)
                  }
                >
                  Restore
                </button>

                <button
                  className={
                    styles.deleteButton
                  }
                  onClick={() =>
                    onDeleteForever(
                      note.id
                    )
                  }
                >
                  Delete Forever
                </button>
              </div>
            </div>
          ))
        )}

        <button
          className={
            styles.cancelButton
          }
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default TrashModal;