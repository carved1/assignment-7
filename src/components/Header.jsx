import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../services/movieService';

function Header({ setSearchResults, setSearchQuery, setSearchLoading, setSearchError }) {
  const [query, setQuery] = useState('');
  const requestId = useRef(0);

  const runSearch = async (value) => {
    const trimmed = value.trim();
    setSearchQuery(trimmed);

    if (!trimmed) {
      requestId.current += 1;
      setSearchResults(null);
      setSearchError(null);
      setSearchLoading(false);
      return;
    }

    const currentRequest = ++requestId.current;

    try {
      setSearchLoading(true);
      setSearchError(null);
      const data = await searchMovies(trimmed);

      if (currentRequest !== requestId.current) {
        return;
      }

      setSearchResults(data.results || []);
    } catch (err) {
      if (currentRequest !== requestId.current) {
        return;
      }

      setSearchResults(null);
      setSearchError(err.message || 'Failed to search movies');
    } finally {
      if (currentRequest === requestId.current) {
        setSearchLoading(false);
      }
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    runSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runSearch(query);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">MovieShelf</Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>
        <form className="search-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={handleChange}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
