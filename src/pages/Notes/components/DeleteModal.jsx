import styles from "../Notes.module.css";

function DeleteModal({
  onClose,
  onConfirm,
}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Delete Note</h3>

        <p>
          Are you sure you want to
          delete this note?
        </p>

        <div className={styles.modalActions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={styles.deleteButton}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;