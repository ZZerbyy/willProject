import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import './Search.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const [results, setResults] = useState([]);
  const query = useQuery().get('query'); // Get the query parameter from URL

  useEffect(() => {
    if (query) {
      // Simulate fetching search results based on the query
      const fetchedResults = [
        { id: 1, title: `Result for ${query} 1`, description: 'Description of result 1' },
        { id: 2, title: `Result for ${query} 2`, description: 'Description of result 2' },
        { id: 3, title: `Result for ${query} 3`, description: 'Description of result 3' },
      ];
      setResults(fetchedResults);
    }
  }, [query]);

  return (
    <div className="search-container">
      <Navigation />
      <div className="search-section p-4">
        <h1 className="text-center mb-4">Search Results for "{query}"</h1>
        <div className="results-section">
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.id} className="result-card">
                <h3>{result.title}</h3>
                <p>{result.description}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No results found for "{query}".</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
