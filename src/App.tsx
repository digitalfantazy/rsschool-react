import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from './components/searchBar/SearchBar';
import ResultsList from './components/ResultList/ResultList';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import Loading from './components/loading/loading';

import { IRecipe } from './types/RecipeTypes';
import { getAllRecipes } from './api/getRecipesAPI';
import { limit } from './api/getRecipesAPI';
import styles from './App.module.css';

const App: React.FC = () => {
  const getPage = () => {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get('page') || '');
  };

  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(getPage);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const getRecipes = async (query: string, page: number) => {
    setLoading(true);
    const data = await getAllRecipes(query, page);
    setTotalPages(Math.ceil(data.total / limit));
    setRecipes(data.recipes);
    setLoading(false);
  };

  useEffect(() => {
    if (location.pathname.includes('/details/')) {
      setIsDetailsOpen(true);
    } else {
      setIsDetailsOpen(false);
    }
  }, [location]);

  return (
    <div className={styles.container}>
      <ErrorBoundary>
        <h1>Recipes</h1>
        <SearchBar
          getRecipes={getRecipes}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setIsDetailsOpen={setIsDetailsOpen}
        />
        <div className={`${styles.mainContent} ${isDetailsOpen ? styles.shifted : ''}`}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <ResultsList
                results={recipes}
                setIsDetailsOpen={setIsDetailsOpen}
                isDetailsOpen={isDetailsOpen}
              />
            </>
          )}
          <Outlet context={{ isDetailsOpen, setIsDetailsOpen }} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
