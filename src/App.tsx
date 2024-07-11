import { useState } from 'react';

import SearchBar from './components/searchBar/SearchBar';
import ResultsList from './components/searchResults/SearchResults';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import Loading from './components/loading/loading';

import { IStarship } from './types/StarshipType';
import { getStarships } from './api/getStarships';
import './App.css';

const App: React.FC = () => {
  const [starship, setStarship] = useState<IStarship[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async (query: string) => {
    setLoading(true);
    const data = await getStarships(query);
    setStarship(data.results);
    setLoading(false);
  };

  const handleSearch = (query: string) => {
    getData(query);
  };

  return (
    <div className="container">
      <ErrorBoundary>
        <h1>StarShips From StarWars</h1>
        <SearchBar onSearch={handleSearch} />
        {loading ? <Loading /> : <ResultsList results={starship} />}
      </ErrorBoundary>
    </div>
  );
};

export default App;
