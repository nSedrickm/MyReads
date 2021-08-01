import React from 'react'
import * as BooksAPI from './BooksAPI';
import './App.css'
import BookShelf from './components/BookShelf';
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
                <BookShelf
                  title="Currently Reading"
                  books={this.state.currentlyReading}
                  onChangeShelf={this.changeShelf}
                />
                <BookShelf
                  title="Want to Read"
                  books={this.state.wantToRead}
                  onChangeShelf={this.changeShelf}
                />
                <BookShelf
                  title="Read"
                  books={this.state.read}
                  onChangeShelf={this.changeShelf}
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
            onChangeShelf={this.changeShelf}
          />
        )}
        />

      </div>
    )
  }
}

export default BooksApp
