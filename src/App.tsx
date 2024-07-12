import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SearchBar from './components/searchBar/SearchBar';
import Pagination from './components/Pagination/Pagination';
import ResultsList from './components/searchResults/SearchResults';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import Loading from './components/loading/loading';

import { IRecipe } from './types/RecipeTypes';
import { getAllRecipes } from './api/getRecipes';
import './App.css';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [query, setQuery] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();

  const limit = 10;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    const searchQuery = params.get('query') || '';
    setCurrentPage(page);
    setQuery(searchQuery);
    const skip = (page - 1) * limit;
    getData(searchQuery, skip, limit);
  }, [location.search]);

  const getData = async (query: string, skip: number, limit: number) => {
    setLoading(true);
    const data = await getAllRecipes(query, skip, limit);
    setRecipes(data.recipes);
    setTotalPages(data.total / limit);
    setLoading(false);
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    navigate(`/?query=${query}&page=1`);
  };

  const handlePageChange = (page: number) => {
    navigate(`/?query=${query}&page=${page}`);
  };

  return (
    <div className="container">
      <ErrorBoundary>
        <h1>Recipes</h1>
        <SearchBar onSearch={handleSearch} />
        {loading ? <Loading /> : <ResultsList results={recipes} />}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </ErrorBoundary>
    </div>
  );
};

export default App;
