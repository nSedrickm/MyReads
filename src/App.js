import React from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css'
import Book from "./components/Book";
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((response) => {
        let currentlyReading = this.filter(response, "currentlyReading");
        let wantToRead = this.filter(response, "wantToRead");
        let read = this.filter(response, "read");
        this.setState({
          books: response,
          currentlyReading: currentlyReading,
          wantToRead: wantToRead,
          read: read
        })
      })
  }

  filter(books, criteria) {
    return books.filter(book => book.shelf === criteria);
  }

  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf)
      .then((response) => {
        window.location.reload();
      })
  }

  render() {
    return (
      <div className="app">

        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                className="close-search"
                to="/"
              >
                Close
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.currentlyReading.map(book =>
                        <li key={book.id}>
                          <Book
                            book={book}
                            onChangeShelf={this.changeShelf}
                          />
                        </li>
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.wantToRead.map(book =>
                        <li key={book.id}>
                          <Book
                            book={book}
                            onChangeShelf={this.changeShelf}
                          />
                        </li>
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.read.map(book =>
                        <li key={book.id}>
                          <Book
                            book={book}
                            onChangeShelf={this.changeShelf}
                          />
                        </li>
                      )}
                    </ol>
                  </div>
                </div>
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
      </div>
    )
  }
}

export default BooksApp
