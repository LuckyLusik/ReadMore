import React, { useState } from 'react';
import uuid from 'uuid';

export default function BookDisplay({ book: { id, title, author, rate, imageURL } }) {

    const deleteBook = (bookId) => {
        setBooks(props.books.filter( book => book.id !== bookId));
    };
    return (
        <div style={{display: "block"}}>
            <button onClick={() => deleteBook(id)}>Delete</button>
            {title} {author} {rate} {imageURL}
        </div>
    )
}
