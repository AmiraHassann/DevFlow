import styles from "./Modal.module.css";

function Modal({
  title,
  message,
  onConfirm,
  onClose,
}) {
  return (
    <>
      <div
        className={styles.overlay}
        onClick={onClose}
      />

      <div className={styles.modal}>
        <h2>{title}</h2>

        <p>{message}</p>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={styles.confirmButton}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;