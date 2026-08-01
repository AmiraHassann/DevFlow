import styles from "../Tasks.module.css";

function TrashedTasks({
  trashedTasks,
  onClose,
  onRestore,
  onDeleteForever,
}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Trash Bin</h3>

        {trashedTasks.length === 0 ? (
          <p>Trash is empty.</p>
        ) : (
          trashedTasks.map((task) => (
            <div
              key={task.id}
              className={styles.trashItem}
            >
              <strong>
                {task.title}
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
                    onRestore(task)
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
                      task.id
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

export default TrashedTasks;