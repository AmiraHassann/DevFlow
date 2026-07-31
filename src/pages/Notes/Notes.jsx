import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  Pin,
  Trash2,
  X,
} from "lucide-react";

import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import DeleteModal from "./components/DeleteModal";
import TrashModal from "./components/TrashModal";
import EmptyNotes from "./components/EmptyNotes";
import NotesStats from "./components/NotesStats";
import NotesFilters from "./components/NotesFilters";

import styles from "./Notes.module.css";

function Notes() {
  const [notes, setNotes] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("notes")
      ) || []
    );
  });

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingNote, setEditingNote] =
    useState(null);

  const [noteToDelete, setNoteToDelete] =
    useState(null);

  const [showTrash, setShowTrash] =
    useState(false);

  const [trashedNotes, setTrashedNotes] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "trashedNotes"
          )
        ) || []
      );
    });

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortBy, setSortBy] =
    useState("");

  const [showSortMenu, setShowSortMenu] =
    useState(false);

  const [selectedNotes, setSelectedNotes] =
    useState([]);

  const sortRef = useRef(null);

  const handleSelectNote = (id) => {
    setSelectedNotes((prev) =>
      prev.includes(id)
        ? prev.filter(
          (noteId) =>
            noteId !== id
        )
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
  const notesToTrash = notes.filter(
    (note) =>
      selectedNotes.includes(
        note.id
      )
  );

  setTrashedNotes((prev) => [
    ...notesToTrash,
    ...prev,
  ]);

  setNotes(
    notes.filter(
      (note) =>
        !selectedNotes.includes(
          note.id
        )
    )
  );

  setSelectedNotes([]);
};

  const handlePinSelected = () => {
    setNotes(
      notes.map((note) =>
        selectedNotes.includes(
          note.id
        )
          ? {
            ...note,
            pinned: true,
          }
          : note
      )
    );

    setSelectedNotes([]);
  };

  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes)
    );
  }, [notes]);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(
          event.target
        )
      ) {
        setShowSortMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        note.content
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    )
   .sort((a, b) => {
  if (a.pinned !== b.pinned) {
    return Number(b.pinned) -
      Number(a.pinned);
  }

  if (sortBy === "oldest") {
    return a.id - b.id;
  }

  if (sortBy === "updated") {
    return (
      new Date(
        b.updatedAt ||
          b.createdAt
      ) -
      new Date(
        a.updatedAt ||
          a.createdAt
      )
    );
  }

  return b.id - a.id;
});

  const totalNotes =
    notes.length;

  const pinnedNotes =
    notes.filter(
      (note) => note.pinned
    ).length;

  const deletedNotes =
    trashedNotes.length;

  const handleAddNote = (
    title,
    content
  ) => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      pinned: false,

      createdAt:
        new Date().toLocaleString(),

      updatedAt: null,
    };

    setNotes((prev) => [
      newNote,
      ...prev,
    ]);

    setIsModalOpen(false);
  };

  const handleUpdateNote = (
    title,
    content
  ) => {
    setNotes(
      notes.map((note) =>
        note.id === editingNote.id
          ? {
            ...note,
            title,
            content,
            updatedAt:
              new Date().toLocaleString(),
          }
          : note
      )
    );

    setEditingNote(null);
    setIsModalOpen(false);
  };

  const handleDeleteNote = () => {
    setTrashedNotes((prev) => [
      noteToDelete,
      ...prev,
    ]);

    setNotes(
      notes.filter(
        (note) =>
          note.id !== noteToDelete.id
      )
    );

    setNoteToDelete(null);
  };

  const handleRestoreNote = (
    note
  ) => {
    setNotes((prev) => [
      note,
      ...prev,
    ]);

    setTrashedNotes((prev) =>
      prev.filter(
        (item) =>
          item.id !== note.id
      )
    );
  };

  const handleDeleteForever = (
    id
  ) => {
    setTrashedNotes((prev) =>
      prev.filter(
        (note) =>
          note.id !== id
      )
    );
  };

  const handleTogglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
            ...note,
            pinned:
              !note.pinned,
          }
          : note
      )
    );
  };

  const openCreateModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  return (
    <main className={styles.notes}>
      <div className={styles.header}>
        <h1>Notes</h1>

        <div className={styles.headerActions}>
          <button
            className={styles.trashButton}
            onClick={() =>
              setShowTrash(true)
            }
          >
            🗑️ Trash
          </button>

          <button
            className={styles.addButton}
            onClick={openCreateModal}
          >
            + New Note
          </button>
        </div>
      </div>

      <NotesStats
        totalNotes={totalNotes}
        pinnedNotes={pinnedNotes}
        deletedNotes={deletedNotes}
      />

      <NotesFilters
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
        sortBy={sortBy}
        setSortBy={setSortBy}
        showSortMenu={
          showSortMenu
        }
        setShowSortMenu={
          setShowSortMenu
        }
        sortRef={sortRef}
      />

      {filteredNotes.length === 0 ? (
        <EmptyNotes />
      ) : (
        <>
          {selectedNotes.length > 0 && (
  <div className={styles.bulkActions}>
    <span>
      {selectedNotes.length} Selected
    </span>

    <button
      onClick={handlePinSelected}
    >
      <Pin size={16} />
      Pin Selected
    </button>

    <button
      onClick={handleDeleteSelected}
    >
      <Trash2 size={16} />
      Delete Selected
    </button>

    <button
      onClick={() =>
        setSelectedNotes([])
      }
    >
      <X size={16} />
      Clear
    </button>
  </div>
)}
          <div className={styles.notesGrid}>
            {filteredNotes.map(
              (note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  selected={selectedNotes.includes(
                    note.id
                  )}
                  onSelect={() =>
                    handleSelectNote(
                      note.id
                    )
                  }
                  onEdit={() =>
                    openEditModal(note)
                  }
                  onDelete={() =>
                    setNoteToDelete(
                      note
                    )
                  }
                  onPin={() =>
                    handleTogglePin(
                      note.id
                    )
                  }
                />
              )
            )}
          </div>
        </>
      )}

      {isModalOpen && (
        <NoteModal
          note={editingNote}
          onClose={() =>
            setIsModalOpen(false)
          }
          onSave={(
            title,
            content
          ) => {
            if (editingNote) {
              handleUpdateNote(
                title,
                content
              );
            } else {
              handleAddNote(
                title,
                content
              );
            }
          }}
        />
      )}

      {noteToDelete && (
        <DeleteModal
          onClose={() =>
            setNoteToDelete(null)
          }
          onConfirm={
            handleDeleteNote
          }
        />
      )}

      {showTrash && (
        <TrashModal
          trashedNotes={
            trashedNotes
          }
          onClose={() =>
            setShowTrash(false)
          }
          onRestore={
            handleRestoreNote
          }
          onDeleteForever={
            handleDeleteForever
          }
        />
      )}
    </main>
  );
}

export default Notes;