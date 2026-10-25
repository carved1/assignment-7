import { useContext, useState } from 'react';
import { MovieContext } from '../contexts/MovieContext';

const FAVORITES_KEY = 'favoriteMovies';

function readFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function MovieCard({ movie, onFavoriteChange }) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(MovieContext);
  const isInWatchlist = watchlist.some((item) => item.id === movie.id);

  const [isFavorite, setIsFavorite] = useState(() => {
    return readFavorites().some((favorite) => favorite.id === movie.id);
  });

  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450/667eea/ffffff?text=No+Poster';

  const year = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A';

  const toggleFavorite = () => {
    const favorites = readFavorites();
    const nextFavorites = isFavorite
      ? favorites.filter((favorite) => favorite.id !== movie.id)
      : [...favorites, movie];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    setIsFavorite(!isFavorite);

    if (onFavoriteChange) {
      onFavoriteChange(movie, !isFavorite);
    }
  };

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterSrc} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {rating}</span>
          <span className="movie-year">{year}</span>
        </div>
        <button
          type="button"
          className={`favorite-button${isFavorite ? ' favorited' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
        <button
          type="button"
          className={`watchlist-button${isInWatchlist ? ' in-watchlist' : ''}`}
          onClick={toggleWatchlist}
        >
          {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
