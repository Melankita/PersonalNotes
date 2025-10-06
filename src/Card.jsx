// Card.jsx
import { useState, useEffect } from 'react';
import notes from './assets/notes-image.png';

function Card({ id, notesList, count, onAddNote, onIncrementCount, onDelete }) {
  const [inputValue, setInputValue] = useState('');
  const [savedNotes, setSavedNotes] = useState(notesList || []);

  // Sync notes when they change from parent (like loading from localStorage)
  useEffect(() => {
    setSavedNotes(notesList || []);
  }, [notesList]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddNote = () => {
    if (inputValue.trim() === '') return;
    const updatedNotes = [...savedNotes, inputValue.trim()];
    setSavedNotes(updatedNotes);
    onAddNote(id, updatedNotes);
    setInputValue(''); // clear input after adding
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddNote();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(id);
    }
  };

  return (
    <div className="card">
      <img src={notes} className="image" alt="Sticky note icon" />

      <label htmlFor={`note-${id}`} className="note-label">
        Note Content:
      </label>

      <input
        type="text"
        id={`note-${id}`}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="note-input"
        placeholder="Type and press Enter or click Save..."
        aria-label="Note input field"
      />

    

      <ul className="saved-notes">
        {savedNotes.length === 0 ? (
          <li className="placeholder">No notes yet 📝</li>
        ) : (
          savedNotes.map((n, index) => (
            <li key={index} className="note-item">
              {n}
            </li>
          ))
        )}
      </ul>

      <div className="card-actions">
        <button className="button count-button" onClick={() => onIncrementCount(id)}>
          Clicks: {count}
        </button>

        <button className="button delete-button" onClick={handleDelete}>
          ❌ Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
