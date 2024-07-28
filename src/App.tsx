import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsList from './components/ResultList/ResultList';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import styles from './App.module.css';
import { useActions } from './hooks/useActions';
import { useAppSelector } from './hooks/useAppSelector';
import Flyout from './components/Flyout/Flyout';
import { ThemeContext } from './providers/ThemeProvider';

const App: React.FC = () => {
  const location = useLocation();

  const { openDetails, closeDetails } = useActions();
  const { isOpen } = useAppSelector((state) => state.openDetails);

  const themeContext = useContext(ThemeContext);
  const theme = themeContext ? themeContext.isLightTheme : false;

  useEffect(() => {
    if (location.pathname.includes('/details/')) {
      openDetails();
    } else {
      closeDetails();
    }
  }, [location]);

  return (
    <main className={theme ? styles.lightTheme : styles.darkTheme}>
      <div className={styles.container}>
        <h1>Recipes</h1>
        <ErrorBoundary>
          <SearchBar />
          <div className={`${styles.mainContent} ${isOpen ? styles.shifted : ''}`}>
            <ResultsList />
            <Outlet />
          </div>
          <Flyout />
        </ErrorBoundary>
      </div>
    </main>
  );
};

export default App;
