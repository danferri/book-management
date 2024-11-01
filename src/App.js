// src/App.js
import React, { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSave = () => setSelectedBook(null);

  return (
    <div>
      <h1>Book Management</h1>
      <BookForm selectedBook={selectedBook} onSave={handleSave} onCancel={() => setSelectedBook(null)} />
      <BookList onEdit={setSelectedBook} />
    </div>
  );
}

export default App;
