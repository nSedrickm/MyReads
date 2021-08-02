import React, { useState } from 'react'
import * as BooksAPI from './BooksAPI';
import BookShelf from './components/BookShelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchPage = (props) => {

  const { onChangeShelf, books } = props;
  const [state, setState] = useState(
    {
      searchResults: [],
      query: "",
      message: ""
    }
  );

  let timer;

  const setQuery = (query) => {
    setState(prevState => {
      return { ...prevState, query: query };
    })
  }

  const debounceInput = (event) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setState(prevState => {
        return { ...prevState, message: "searching please wait ..." };
      });
      searchBooks();
    }, 500)
  }

  const handleSearchInput = () => {
    clearTimeout(timer);
    setState(prevState => {
      return { ...prevState, message: "you are typing ..." };
    })
  }

  const searchBooks = () => {
    console.log(state.query);
    if (state.query.trim().length) {
      BooksAPI.search(state.query)
        .then((response) => {
          console.log(response)
          let orderedShelf = arrangeBooks(response, books);
          setState(prevState => {
            return { ...prevState, searchResults: orderedShelf, message: "" }
          })
        })
        .catch((error) => {
          setState(prevState => {
            return { ...prevState, message: "" }
          })
        })
    } else {
      setState(prevState => {
        return { ...prevState, message: "Sorry we cannot search for what you typed" }
      })
    }
  }

  const arrangeBooks = (searchedBooks, books) => {
    return searchedBooks.map((item) => {
      books.forEach(book => {
        if (item.title === book.title) {
          item.shelf = book.shelf;
        }
      })
      return item;
    })
  }

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
            <input
              type="search"
              placeholder="Search by title or author"
              onChange={(event) => setQuery(event.target.value)}
              onKeyPress={(event) => handleSearchInput(event)}
              onKeyUp={() => debounceInput()}
            />
          </div>
        </div>
        <div className="search-books-results">
          {state.searchResults?.length ? (
            <BookShelf
              title="Search Results"
              books={state.searchResults}
              onChangeShelf={onChangeShelf}
            />
          ) : (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{state.message || "No Search Results"}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

SearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
}

export default SearchPage
