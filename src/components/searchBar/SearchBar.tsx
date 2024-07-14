import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useSearchQuery from '../../hooks/useSearchQuery';
import { useNavigate } from 'react-router-dom';

import Pagination from '../Pagination/Pagination';
import './searchbar.css';
import { useSearchParams } from 'react-router-dom';
interface SearchBarProps {
  getRecipes: (query: string, page: number) => void;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  setIsDetailsOpen: (isOpen: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  getRecipes,
  totalPages,
  setCurrentPage,
  currentPage,
  setIsDetailsOpen,
}) => {
  const [query, setQuery] = useSearchQuery('query', '');
  const [error, setError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const pageParam = searchParams.get('page');
    setCurrentPage(Number(pageParam));
    setSearchParams({
      page: currentPage.toString(),
      search: query,
    });
    getRecipes(query, currentPage);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (): void => {
    const queryTrim = query.trim();
    setQuery(queryTrim);
    setCurrentPage(1);
    setSearchParams({
      page: currentPage.toString(),
      search: queryTrim,
    });
    localStorage.setItem('searchString', queryTrim);
    getRecipes(queryTrim, currentPage);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({
      page: page.toString(),
      search: query,
    });
    getRecipes(query, page);
    navigate(`/?page=${page}&search=${query}`);
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
      {totalPages > 1 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          ChangePage={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          setIsDetailsOpen={setIsDetailsOpen}
        ></Pagination>
      )}
    </>
  );
};

SearchBar.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  setIsDetailsOpen: PropTypes.func.isRequired,
};

export default SearchBar;
