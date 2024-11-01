// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookForm.css';

const BookForm = ({ selectedBook, onSave, onCancel }) => {
  const [book, setBook] = useState({ title: '', author: '', year: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (selectedBook) setBook(selectedBook);
  }, [selectedBook]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.title || !book.author || !book.year) {
      setError('All fields are required.');
      return;
    }

    if (isNaN(book.year) || book.year.length !== 4) {
      setError('Year must be a 4-digit number.');
      return;
    }

    try {
      if (book.id) {
        await axios.put(`http://localhost:3001/books/${book.id}`, book);
        setSuccess('Book updated successfully!');
      } else {
        await axios.post('http://localhost:3001/books', book);
        setSuccess('Book added successfully!');
      }
      onSave();
      setBook({ title: '', author: '', year: '' });
    } catch (error) {
      setError('Error saving book. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>{book.id ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={book.title} onChange={handleChange} placeholder="Title" />
        <input name="author" value={book.author} onChange={handleChange} placeholder="Author" />
        <input name="year" value={book.year} onChange={handleChange} placeholder="Year (e.g., 2023)" />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" className="save">Save</button>
        {onCancel && <button onClick={onCancel} className="cancel">Cancel</button>}
      </form>
    </div>
  );
};

export default BookForm;
