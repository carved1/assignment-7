import { useContext } from 'react';
import { MovieContext } from '../contexts/MovieContext';
import MovieGrid from '../components/MovieGrid';

function Watchlist() {
  const { watchlist } = useContext(MovieContext);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you plan to watch</p>
      </div>
      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <div className="empty-state">
          <p>Your watchlist is empty. Add movies from the home page!</p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;
