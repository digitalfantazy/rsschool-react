import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Pagination from '../../components/Pagination/Pagination';
import '@testing-library/jest-dom';

const setCurrentPageMock = vi.fn();
const setTotalPagesMock = vi.fn();

vi.mock('../../api/recipeApi', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useGetAllRecipesQuery: vi.fn(() => ({
      data: { total: 50 },
      isLoading: false,
      error: null,
    })),
    useGetRecipesDetailsQuery: vi.fn(),
  };
});

vi.mock('../../hooks/useActions', () => ({
  useActions: () => ({
    setCurrentPage: setCurrentPageMock,
    setTotalPages: setTotalPagesMock,
  }),
}));

vi.mock('../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn((selector) =>
    selector({
      pagination: {
        totalPages: 5,
        currentPage: 1,
      },
    }),
  ),
}));

interface RootState {
  pagination: {
    totalPages: number;
    currentPage: number;
  };
}

const mockStore = configureStore<RootState>([]);

const renderWithProviders = (
  ui: React.ReactElement,
  { store }: { store: MockStoreEnhanced<RootState> },
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('Pagination Component', () => {
  it('renders pagination buttons correctly', async () => {
    const store = mockStore({
      pagination: {
        totalPages: 5,
        currentPage: 1,
      },
    });

    renderWithProviders(<Pagination page={1} searchQuery="test" />, { store });

    await waitFor(() => {
      expect(screen.getByText('Prev')).toBeDisabled();
      expect(screen.getByText('1').getAttribute('class')).toMatch(/active/);
      expect(screen.getByText('2').getAttribute('class')).not.toMatch(/active/);
      expect(screen.getByText('Next')).toBeEnabled();
    });
  });

  it('calls handlePageChange with the correct page number when a page button is clicked', async () => {
    const store = mockStore({
      pagination: {
        totalPages: 5,
        currentPage: 1,
      },
    });

    renderWithProviders(<Pagination page={1} searchQuery="test" />, { store });

    fireEvent.click(screen.getByText('2'));

    await waitFor(() => {
      expect(setCurrentPageMock).toHaveBeenCalledWith(2);
    });
  });

  it('disables Prev button on the first page', async () => {
    const store = mockStore({
      pagination: {
        totalPages: 5,
        currentPage: 1,
      },
    });

    renderWithProviders(<Pagination page={1} searchQuery="test" />, { store });

    await waitFor(() => {
      expect(screen.getByText('Prev')).toBeDisabled();
    });
  });

  it('disables Next button on the last page', async () => {
    const store = mockStore({
      pagination: {
        totalPages: 5,
        currentPage: 5,
      },
    });

    renderWithProviders(<Pagination page={5} searchQuery="test" />, { store });

    await waitFor(() => {
      const nextButton = screen.getByText('Prev');
      expect(nextButton).toBeDisabled();
      expect(nextButton.className).toMatch(/disabled/);
    });
  });
});
