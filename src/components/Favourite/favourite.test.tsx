// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Favourite from '../../components/Favourite/Favourite';
import { recipesActions } from '../../store/slices/recipes.slice';
import '@testing-library/jest-dom';

// Mock the useActions hook
const mockAddFavorite = vi.fn();
const mockRemoveFavorite = vi.fn();

vi.mock('../../hooks/useActions', () => ({
  useActions: () => ({
    addFavorite: mockAddFavorite,
    removeFavorite: mockRemoveFavorite,
  }),
}));

describe('Favourite Component', () => {
  const mockFavourite = {
    id: 1,
    name: 'Recipe 1',
    instructions: ['Step 1', 'Step 2'],
    ingredients: ['Ingredient 1', 'Ingredient 2'],
  };

  beforeEach(() => {
    mockAddFavorite.mockClear();
    mockRemoveFavorite.mockClear();
    store.dispatch(recipesActions.clearFavourites());
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <Favourite {...mockFavourite} />
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays the correct button text when not a favourite', () => {
    render(
      <Provider store={store}>
        <Favourite {...mockFavourite} />
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('➕');
  });

  it('displays the correct button text when a favourite', () => {
    store.dispatch(recipesActions.addFavorite(mockFavourite));

    render(
      <Provider store={store}>
        <Favourite {...mockFavourite} />
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('❤️');
  });

  it('adds a favourite when the button is clicked and it is not already a favourite', () => {
    render(
      <Provider store={store}>
        <Favourite {...mockFavourite} />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(mockAddFavorite).toHaveBeenCalledWith(mockFavourite);
  });

  it('removes a favourite when the button is clicked and it is already a favourite', () => {
    store.dispatch(recipesActions.addFavorite(mockFavourite));

    render(
      <Provider store={store}>
        <Favourite {...mockFavourite} />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockFavourite);
  });
});
