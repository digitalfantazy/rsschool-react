import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter, RouteObject } from 'react-router-dom';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import { useGetRecipesDetailsQuery } from '../../api/recipeApi';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

vi.mock('../../api/recipeApi', () => ({
  useGetRecipesDetailsQuery: vi.fn(),
}));

const mockCloseDetails = vi.fn();
vi.mock('../../hooks/useActions', () => ({
  useActions: () => ({
    closeDetails: mockCloseDetails,
  }),
}));

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn((selector) =>
    selector({
      openDetails: {
        isOpen: true,
      },
      recipes: {
        favourites: [],
      },
    }),
  ),
}));

const mockStore = configureStore([]);
const store = mockStore({
  openDetails: {
    isOpen: true,
  },
  recipes: {
    favourites: [],
  },
});

const routes: RouteObject[] = [
  {
    path: 'details/:id',
    element: <RecipeDetails />,
  },
];

const renderWithRouter = (route: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [route] });
  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
};

describe('RecipeDetails Component', () => {
  it('displays loader while fetching data', async () => {
    (useGetRecipesDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isFetching: false,
      isError: false,
      data: null,
    });

    renderWithRouter('/details/1');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays detailed info correctly', async () => {
    (useGetRecipesDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      data: {
        id: 1,
        name: 'Classic Margherita Pizza',
        ingredients: ['Pizza dough', 'Tomato sauce'],
        instructions: [
          'Preheat the oven to 475°F (245°C).',
          'Roll out the pizza dough and spread tomato sauce evenly.',
        ],
        image: '/path/to/image1.jpg',
        prepTimeMinutes: 10,
        cookTimeMinutes: 20,
      },
    });

    renderWithRouter('/details/1');
    await waitFor(() => {
      expect(screen.getByText('Classic Margherita Pizza')).toBeInTheDocument();
      expect(screen.getByText('Cook time: 30 min')).toBeInTheDocument();
      expect(screen.getByText('Ingredients:')).toBeInTheDocument();
      expect(screen.getByText('Instructions:')).toBeInTheDocument();
    });
  });

  it('displays "No recipe details found" for non existing recipe', async () => {
    (useGetRecipesDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      data: null,
    });

    renderWithRouter('/details/1123');
    await waitFor(() => {
      expect(screen.getByText('No recipe details found')).toBeInTheDocument();
    });
  });

  it('closes the details view when clicking the close button', async () => {
    (useGetRecipesDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      data: {
        id: 1,
        name: 'Classic Margherita Pizza',
        ingredients: ['Pizza dough', 'Tomato sauce'],
        instructions: [
          'Preheat the oven to 475°F (245°C).',
          'Roll out the pizza dough and spread tomato sauce evenly.',
        ],
        image: '/path/to/image1.jpg',
        prepTimeMinutes: 10,
        cookTimeMinutes: 20,
      },
    });

    renderWithRouter('/details/1');
    await waitFor(() => {
      expect(screen.getByText('Classic Margherita Pizza')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Close'));
    expect(mockCloseDetails).toHaveBeenCalled();
  });
});
