// src/components/BookItem.js
import React from 'react';
import './BookItem.css';

const BookItem = ({ book, onEdit, onDelete }) => (
    <div className="book-item">
        <h3>{book.title}</h3>
        <p>Author: {book.author}</p>
        <p>Year: {book.year}</p>
        <button onClick={() => onEdit(book)} className="edit">Edit</button>
        <button onClick={() => onDelete(book.id)} className="delete">Delete</button>
    </div>
);

export default BookItem;
