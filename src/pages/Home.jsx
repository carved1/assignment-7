import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults, searchQuery, searchLoading, searchError }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPopularMovies();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message || 'Failed to load popular movies');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const isSearching = Boolean(searchQuery);
  const displayedMovies = isSearching ? (searchResults || []) : movies;
  const isLoading = isSearching ? searchLoading : loading;
  const activeError = isSearching ? searchError : error;

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{isSearching ? 'Search Results' : 'Popular Movies'}</h2>
        <p>
          {isSearching
            ? `Results for "${searchQuery}"`
            : 'Discover and save your favorite films'}
        </p>
      </div>

      {isLoading && <LoadingSpinner />}
      {!isLoading && activeError && <ErrorMessage message={activeError} />}
      {!isLoading && !activeError && displayedMovies.length > 0 && (
        <MovieGrid movies={displayedMovies} />
      )}
      {!isLoading && !activeError && isSearching && displayedMovies.length === 0 && (
        <div className="empty-state">
          <p>No movies found. Try a different search.</p>
        </div>
      )}
    </main>
  );
}

export default Home;
