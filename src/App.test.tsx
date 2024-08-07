import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './providers/ThemeProvider';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Router>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Recipes')).toBeInTheDocument();
  });
});
