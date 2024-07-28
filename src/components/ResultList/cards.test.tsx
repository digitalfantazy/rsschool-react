import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ResultsList from '../../components/ResultList/ResultList';
import { useGetAllRecipesQuery } from '../../api/recipeApi';

const mockStore = configureStore([]);

const mockRecipes = [
  {
    id: 1,
    name: 'Recipe 1',
    ingredients: 'Ingredients 1',
    instructions: 'Instructions 1',
    image: '/path/to/image1.jpg',
    caloriesPerServing: 200,
    difficulty: 'Easy',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Recipe 2',
    ingredients: 'Ingredients 2',
    instructions: 'Instructions 2',
    image: '/path/to/image2.jpg',
    caloriesPerServing: 300,
    difficulty: 'Medium',
    rating: 4.0,
  },
];

const initialState = {
  openDetails: {
    isOpen: false,
  },
  pagination: {
    totalPages: 5,
    currentPage: 1,
  },
  recipes: {
    favourites: [],
  },
};

vi.mock('../../api/recipeApi', () => ({
  useGetAllRecipesQuery: vi.fn(),
}));

vi.mock('../../hooks/useActions', () => ({
  useActions: () => ({
    openDetails: vi.fn(),
  }),
}));

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn((selector) =>
    selector({
      ...initialState,
    }),
  ),
}));
const renderWithProviders = (ui: React.ReactElement, storeOverrides = {}) => {
  const store = mockStore({
    ...initialState,
    ...storeOverrides,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  );
};

describe('ResultsList Component', () => {
  beforeEach(() => {
    (useGetAllRecipesQuery as unknown as jest.Mock).mockReturnValue({
      data: { recipes: mockRecipes },
      isError: false,
      isFetching: false,
      isLoading: false,
    });
  });

  it('renders the specified number of cards', () => {
    renderWithProviders(<ResultsList />);

    const cards = screen.getAllByRole('img', { name: /dish-image/i });
    expect(cards).toHaveLength(mockRecipes.length);
  });

  it('displays no cards message', () => {
    (useGetAllRecipesQuery as unknown as jest.Mock).mockReturnValueOnce({
      data: { recipes: [] },
      isError: false,
      isFetching: false,
      isLoading: false,
    });

    renderWithProviders(<ResultsList />);

    const response = screen.getByText('No results');
    expect(response).toBeInTheDocument();
  });

  it('renders recipes with relevant data', () => {
    renderWithProviders(<ResultsList />);

    mockRecipes.forEach((recipe) => {
      expect(screen.getByText(recipe.name)).toBeInTheDocument();
      expect(screen.getByText(`Calories: ${recipe.caloriesPerServing}`)).toBeInTheDocument();
      expect(screen.getByText(`Difficulty: ${recipe.difficulty}`)).toBeInTheDocument();
      expect(screen.getByText(`Rating: ${recipe.rating}`)).toBeInTheDocument();
    });
  });

  it('clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ResultsList />);

    const userItem = screen.getByText(mockRecipes[0].name);
    await user.click(userItem);

    await waitFor(() => {
      expect(window.location.pathname).toBe(`/details/${mockRecipes[0].id}`);
    });
  });
});
