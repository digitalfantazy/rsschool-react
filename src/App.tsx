import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SearchBar from './components/searchBar/SearchBar';
import ResultsList from './components/ResultList/ResultList';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeDetails, openDetails } from './store/slices/openDetailsSlice';
import { RootState } from './store/store';

const App: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isDetailsOpen = useSelector((state: RootState) => state.openDetails.isOpen);

  useEffect(() => {
    if (location.pathname.includes('/details/')) {
      dispatch(openDetails());
    } else {
      dispatch(closeDetails());
    }
  }, [location, dispatch]);

  return (
    <div className={styles.container}>
      <ErrorBoundary>
        <h1>Recipes</h1>
        <SearchBar />
        <div className={`${styles.mainContent} ${isDetailsOpen ? styles.shifted : ''}`}>
          <ResultsList />
          <Outlet />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
