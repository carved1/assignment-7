import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  return (
    <Router>
      <div className="app">
        <Header
          setSearchResults={setSearchResults}
          setSearchQuery={setSearchQuery}
          setSearchLoading={setSearchLoading}
          setSearchError={setSearchError}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchResults={searchResults}
                searchQuery={searchQuery}
                searchLoading={searchLoading}
                searchError={searchError}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
