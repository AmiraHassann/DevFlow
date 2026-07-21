import styles from "./Modal.module.css";

function Modal({
  title,
  message,
  children,
  confirmText = "Confirm",
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
        {title && <h2>{title}</h2>}

        {children ? (
          children
        ) : (
          <>
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
                {confirmText}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Modal;