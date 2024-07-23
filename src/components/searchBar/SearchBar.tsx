import { ChangeEvent, KeyboardEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

import { setCurrentPage } from '../../store/slices/paginationSlice';
import useSearchQuery from '../../hooks/useSearchQuery';
import Pagination from '../Pagination/Pagination';

import './searchbar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useSearchQuery('query', '');
  const [error, setError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (): void => {
    const queryTrim = query.trim();
    setQuery(queryTrim);
    dispatch(setCurrentPage(1));
    setSearchParams({
      page: '1',
      search: queryTrim,
    });
    localStorage.setItem('searchString', queryTrim);
    navigate(`/?page=1&search=${queryTrim}`);
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
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} type="submit">
          Search
        </button>
        <button onClick={handleError}>Throw Error</button>
      </div>
      <Pagination page={page} searchQuery={searchQuery}></Pagination>
    </>
  );
};

SearchBar.propTypes = {
  setIsDetailsOpen: PropTypes.func.isRequired,
};

export default SearchBar;
