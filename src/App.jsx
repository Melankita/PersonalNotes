// App.jsx
import { useState, useRef, useCallback, useEffect } from 'react';
import Card from './Card.jsx';
import './App.css';

const LOCAL_STORAGE_KEY = 'note-app-cards';

function App() {
  const [cards, setCards] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Error loading notes:', err);
      return [];
    }
  });

  const nextId = useRef(cards.length > 0 ? Math.max(...cards.map((c) => c.id)) + 1 : 1);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCard = useCallback(() => {
    setCards((prev) => [...prev, { id: nextId.current++, notesList: [], count: 0 }]);
  }, []);

  const addNoteToCard = useCallback((id, updatedNotes) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, notesList: updatedNotes } : c))
    );
  }, []);

  const incrementCount = useCallback((id) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, count: c.count + 1 } : c))
    );
  }, []);

  const deleteCard = useCallback((id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return (
    <div className="display">
      <h1>NOTES </h1>
      <button className="button" onClick={addCard}>
        ➕ Add a Note
      </button>

      {cards.length === 0 && (
        <p className="no-notes-message">Your clipboard is empty! Add a note.</p>
      )}

      <div className="card-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            notesList={card.notesList}
            count={card.count}
            onAddNote={addNoteToCard}
            onIncrementCount={incrementCount}
            onDelete={deleteCard}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
