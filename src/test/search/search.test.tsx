import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from '../../components/searchBar/SearchBar';

describe('Search Component', () => {
  const getData = vi.fn();
  const setIsDetailsOpen = vi.fn();
  const placeholderText = 'Search';

  test('renders input field', async () => {
    render(
      <SearchBar
        getRecipes={getData}
        totalPages={1}
        setCurrentPage={vi.fn()}
        currentPage={1}
        setIsDetailsOpen={setIsDetailsOpen}
      />,
      {
        wrapper: BrowserRouter,
      },
    );

    const searchInput = screen.getByPlaceholderText(placeholderText);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders button', async () => {
    render(
      <SearchBar
        getRecipes={getData}
        totalPages={1}
        setCurrentPage={vi.fn()}
        currentPage={1}
        setIsDetailsOpen={setIsDetailsOpen}
      />,
      {
        wrapper: BrowserRouter,
      },
    );

    const searchButtons = screen.getAllByText('Search');
    expect(searchButtons.length).toBeGreaterThan(0);
    expect(searchButtons[0]).toBeInTheDocument();
  });

  it('save value to LS on button click', async () => {
    const user = userEvent.setup();
    render(
      <SearchBar
        getRecipes={getData}
        totalPages={1}
        setCurrentPage={vi.fn()}
        currentPage={1}
        setIsDetailsOpen={setIsDetailsOpen}
      />,
      {
        wrapper: BrowserRouter,
      },
    );

    const searchInput = screen.getByPlaceholderText(placeholderText);
    const searchButtons = screen.getAllByText('Search');
    const searchButton = searchButtons[0];

    const searchTerm = 'Pizza';

    await user.type(searchInput, searchTerm);
    await user.click(searchButton);

    expect(localStorage.getItem('searchString')).toBe(searchTerm);
    expect(getData).toHaveBeenCalled();
  });

  test('retrieves value LS on mounting and set it to input field', async () => {
    const searchTerm = 'Pizza';
    localStorage.setItem('searchString', searchTerm);

    render(
      <SearchBar
        getRecipes={getData}
        totalPages={1}
        setCurrentPage={vi.fn()}
        currentPage={1}
        setIsDetailsOpen={setIsDetailsOpen}
      />,
      {
        wrapper: BrowserRouter,
      },
    );
    const searchInput = screen.getByPlaceholderText(placeholderText);
    expect(searchInput).toHaveValue(searchTerm);
  });
});
