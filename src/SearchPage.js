import React from 'react'
import * as BooksAPI from './BooksAPI';
import BookShelf from './components/BookShelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  searchBooks(query) {
    console.log(query);
    BooksAPI.search(query)
      .then((response) => {
        this.setState({
          books: response
        })
      })
  }

  render() {
    return (
      <div className="app">

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
              <input
                type="search"
                placeholder="Search by title or author"
                onChange={(event) => {
                  event.target.value !== "" && this.searchBooks(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="search-books-results">
            {this.state.books.length ? (
              <BookShelf
                title="Search Results"
                books={this.state.books}
                onChangeShelf={this.props.onChangeShelf}
              />
            ) : (
              <h2 className="bookshelf-title">No Search Results</h2>
            )}
          </div>
        </div>
      </div>
    )
  }
}

SearchPage.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
}

export default SearchPage
