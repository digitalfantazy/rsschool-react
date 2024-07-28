import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, test, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store'; // путь к вашему store
import SearchBar from '../../components/SearchBar/SearchBar';
import ThemeProvider from '../../providers/ThemeProvider';

beforeEach(() => {
  localStorage.clear();
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe('Search Component', () => {
  const placeholderText = 'Search';

  test('renders input field', () => {
    renderWithProviders(<SearchBar />);

    const searchInput = screen.getByPlaceholderText(placeholderText);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders button', () => {
    renderWithProviders(<SearchBar />);

    const searchButtons = screen.getAllByText('Search');
    expect(searchButtons.length).toBeGreaterThan(0);
    expect(searchButtons[0]).toBeInTheDocument();
  });

  it('save value to LS on button click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchBar />);

    const searchInput = screen.getByPlaceholderText(placeholderText);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    const searchTerm = 'Pizza';

    await user.type(searchInput, searchTerm);
    await user.click(searchButton);

    expect(localStorage.getItem('query')).toBe(searchTerm);
  });

  test('retrieves value LS on mounting and set it to input field', () => {
    const searchTerm = 'Pizza';
    localStorage.setItem('query', searchTerm);

    renderWithProviders(<SearchBar />);
    const searchInput = screen.getByPlaceholderText(placeholderText);
    expect(searchInput).toHaveValue(searchTerm);
  });

  it('triggers handleSearch on Enter key press', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchBar />);

    const searchInput = screen.getByPlaceholderText(placeholderText);
    const searchTerm = 'Pizza';

    await user.type(searchInput, `${searchTerm}{enter}`);

    expect(localStorage.getItem('query')).toBe(searchTerm);
  });

  // it('throws an error when error button is clicked', async () => {
  //   const user = userEvent.setup();
  //   renderWithProviders(<SearchBar />);

  //   const errorButton = screen.getByText('Throw Error');

  //   await expect(user.click(errorButton)).rejects.toThrow('Test Error occurred');
  // });
});
