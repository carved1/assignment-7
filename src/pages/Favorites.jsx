import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const FAVORITES_KEY = 'favoriteMovies';

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      setFavoriteMovies(stored ? JSON.parse(stored) : []);
    } catch {
      setError('Unable to load your favorite movies.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFavoriteChange = (movie, isFavorite) => {
    if (!isFavorite) {
      setFavoriteMovies((current) => current.filter((item) => item.id !== movie.id));
    }
  };

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>
      {loading && <LoadingSpinner />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && favoriteMovies.length > 0 && (
        <MovieGrid movies={favoriteMovies} onFavoriteChange={handleFavoriteChange} />
      )}
      {!loading && !error && favoriteMovies.length === 0 && (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
}

export default Favorites;
