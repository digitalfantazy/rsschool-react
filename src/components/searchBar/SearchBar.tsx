import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import { setCurrentPage } from '../../store/slices/pagination.slice';
import useSearchQuery from '../../hooks/useSearchQuery';
import Pagination from '../Pagination/Pagination';

import styles from './searchbar.module.css';
import { useActions } from '../../hooks/useActions';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useSearchQuery('query', '');
  const [error, setError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { setCurrentPage } = useActions();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (): void => {
    const queryTrim = query.trim();
    setQuery(queryTrim);
    setCurrentPage(1);
    setSearchParams({
      page: '1',
      search: queryTrim,
    });
    localStorage.setItem('query', queryTrim);
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
      <div className={styles.search_bar}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          className={styles.search_bar_input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} type="submit">
          Search
        </button>
        <button onClick={handleError}>Throw Error</button>
        <ThemeSwitcher />
      </div>
      <Pagination page={page} searchQuery={searchQuery} />
    </>
  );
};

export default SearchBar;
