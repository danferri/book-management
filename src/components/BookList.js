// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookItem from './BookItem';
import './BookList.css';

const BookList = ({ onEdit }) => {
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/books');
            setBooks(response.data);
        } catch {
            setMessage('Error loading books.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/books/${id}`);
            setMessage('Book deleted successfully.');
            fetchBooks();
        } catch {
            setMessage('Error deleting book.');
        }
    };

    return (
        <div className="container">
            <h2>Book List</h2>
            {message && <p className="message">{message}</p>}
            {books.length > 0 ? (
                books.map((book) => (
                    <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={handleDelete} />
                ))
            ) : (
                <p>No books available. Add a new book to get started!</p>
            )}
        </div>
    );
};

export default BookList;
