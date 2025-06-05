import React, { useState, useEffect } from "react";
import { backend } from "declarations/backend";
import "/style.css";

export default function App() {
  const actor = backend;
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  async function loadNotes() {
    const res = await actor.getAllNotes();
    setNotes(res);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function addOrUpdateNote() {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      if (editingId !== null) {
        await actor.updateNote(editingId, title.trim(), content.trim());
        setEditingId(null);
      } else {
        await actor.addNote(title.trim(), content.trim());
      }
      setTitle("");
      setContent("");
      await loadNotes();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function deleteNote(id) {
    await actor.deleteNote(id);
    await loadNotes();
  }

  function startEdit(note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setContent("");
  }

  function handleKeyDown(e) {
    if (e.ctrlKey && e.key === "Enter") {
      addOrUpdateNote();
    }
  }

  function formatDate(nanosec) {
    const d = new Date(Number(nanosec / BigInt(1_000_000)));
    return d.toLocaleString();
  }

  return (
    <div className="container">
      <h1>Mynoto 🧠</h1>
      <blockquote style={{
        fontStyle: "italic",
        textAlign: "center",
        marginTop: "-10px",
        marginBottom: "20px",
        opacity: 0.8
         }}>
        “The faintest ink is better than the best memory.”<br />– Chinese Proverb
      </blockquote>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addOrUpdateNote();
        }}
        className="note-form"
      >
        {/* Title */}
        <textarea
          className="title-textarea"
          placeholder="Idea title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          rows={1}
        />

        {/* Content */}
        <textarea
          className="content-textarea"
          placeholder="Write down your quick idea here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          rows={5}
        />

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" disabled={loading}>
            {editingId !== null ? "Save Changes" : "Add"}
          </button>
          {editingId !== null && (
            <button type="button" onClick={cancelEdit} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            <div className="note-content">
              <strong>{note.title}</strong>
              <p>{note.content}</p>
            </div>
            <div className="note-info">
              <div className="note-date">{formatDate(note.createdAt)}</div>
              <div className="note-actions">
                <button onClick={() => startEdit(note)} title="Edit">✏️</button>
                <button onClick={() => deleteNote(note.id)} title="Delete" className="delete-btn">&times;</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
