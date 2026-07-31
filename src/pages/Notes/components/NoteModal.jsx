import { useState } from "react";

import styles from "../Notes.module.css";

function NoteModal({
    note,
    onClose,
    onSave,
}) {
    const [title, setTitle] =
        useState(note?.title || "");

    const [content, setContent] =
        useState(note?.content || "");

    const handleSubmit = () => {
        if (
            !title.trim() ||
            !content.trim()
        ) {
            return;
        }

        onSave(title, content);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.modalTitle}>
                    {note
                        ? "Edit Note"
                        : "New Note"}
                </h2>

                <div className={styles.formGroup}>
                    <label>Title</label>

                    <input
                        type="text"
                        placeholder="Enter note title"
                        value={title}
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Content</label>

                    <textarea
                        placeholder="Write your note..."
                        value={content}
                        onChange={(e) =>
                            setContent(
                                e.target.value
                            )
                        }
                        rows="6"
                    />
                </div>

                <div className={styles.modalActions}>
                    <button
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className={styles.saveButton}
                        onClick={handleSubmit}
                    >
                        {note
                            ? "Update"
                            : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteModal;