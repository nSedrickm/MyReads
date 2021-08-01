import React from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css'
import Book from "./components/Book";
import SearchPage from './SearchPage';
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

        <Route path="/search" render={() => (
          <SearchPage
            onChangeShelf={this.changeShelf}
          />
        )}
        />

      </div>
    )
  }
}

export default BooksApp
