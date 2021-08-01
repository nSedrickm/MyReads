import React from 'react';
import PropTypes from 'prop-types';
import Book from "./Book";

const BookShelf = (props) => {

    const { books, onChangeShelf, title } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book =>
                        <li key={book.id}>
                            <Book
                                book={book}
                                onChangeShelf={onChangeShelf}
                            />
                        </li>
                    )}
                </ol>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default BookShelf;