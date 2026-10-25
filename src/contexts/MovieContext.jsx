import { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const MovieContext = createContext(null);

const WATCHLIST_KEY = 'watchlist';

function readWatchlist() {
  try {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(readWatchlist);

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((current) => {
      if (current.some((item) => item.id === movie.id)) {
        return current;
      }
      return [...current, movie];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((current) => current.filter((movie) => movie.id !== movieId));
  };

  return (
    <MovieContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </MovieContext.Provider>
  );
}
