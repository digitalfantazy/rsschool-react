import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSearchQuery from '../../hooks/useSearchQuery';
import './searchbar.css';
interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [localData, setlocalData] = useSearchQuery('query', () => '');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    onSearch(localData);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setlocalData(event.target.value);
  };

  const handleSearch = () => {
    const query = localData.trim();
    setlocalData(query);
    onSearch(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleError = () => {
    setError(true);
  };

  if (error) {
    throw new Error('Test Error occurred');
  }
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={localData}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} type="submit">
        Search
      </button>
      <button onClick={handleError}>Throw Error</button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
