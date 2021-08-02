import React, { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css'
import BookShelf from './components/BookShelf';
import SearchPage from './SearchPage';
import { Route, Link } from 'react-router-dom';

const BooksApp = () => {

  const [state, setState] = useState(
    {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  );

  useEffect(() => {
    BooksAPI.getAll()
      .then((response) => {
        let currentlyReading = filter(response, "currentlyReading");
        let wantToRead = filter(response, "wantToRead");
        let read = filter(response, "read");
        setState((prevState) => {
          return {
            ...prevState,
            books: response,
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read
          }
        })
      })
  }, [])

  const filter = (books, criteria) => {
    return books.filter(book => book.shelf === criteria);
  }

  const changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((response) => {
        window.location.reload();
      })
  }

  return (
    <div className="app">

      <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                title="Currently Reading"
                books={state.currentlyReading}
                onChangeShelf={changeShelf}
              />
              <BookShelf
                title="Want to Read"
                books={state.wantToRead}
                onChangeShelf={changeShelf}
              />
              <BookShelf
                title="Read"
                books={state.read}
                onChangeShelf={changeShelf}
              />
            </div>
          </div>
          <div className="open-search">
            <Link
              className="open-search-button"
              to="/search"
            >
              Add a book
            </Link>
          </div>
        </div>
      )} />

      <Route path="/search" render={() => (
        <SearchPage
          books={state.books}
          onChangeShelf={changeShelf}
        />
      )}
      />

    </div>
  )
}

export default BooksApp
