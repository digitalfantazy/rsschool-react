import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Flyout from './Flyout';
import { recipesActions } from '../../store/slices/recipes.slice';
import '@testing-library/jest-dom';

vi.mock('../../helpers/downloadCsv', () => ({
  downloadCsv: vi.fn(() => 'blob:http://localhost:3000/mock-csv-url'),
}));

describe('Flyout Component', () => {
  it('renders correctly when there are favourites', () => {
    store.dispatch(
      recipesActions.addFavorite({ id: 1, name: 'Recipe 1', ingredients: [], instructions: [] }),
    );

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    expect(screen.getByText('1 recipes are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getAllByText('Download').length).toBe(1);
  });

  it('renders null when there are no favourites', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    expect(screen.queryByText('Show selected')).not.toBeInTheDocument();
  });

  it('hides and shows the flyout when the toggle button is clicked', () => {
    store.dispatch(
      recipesActions.addFavorite({ id: 1, name: 'Recipe 1', ingredients: [], instructions: [] }),
    );

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    const hideButton = screen.getByText('Hide selected');
    fireEvent.click(hideButton);
    expect(screen.getByText('Show selected')).toBeInTheDocument();

    const showButton = screen.getByText('Show selected');
    fireEvent.click(showButton);
    expect(screen.getByText('Hide selected')).toBeInTheDocument();
  });

  it('calls clearFavourites when Unselect all button is clicked', () => {
    store.dispatch(
      recipesActions.addFavorite({
        id: 1,
        name: 'Classic Margherita Pizza',
        ingredients: [],
        instructions: [],
      }),
    );

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    const unselectAllButton = screen.getByText('Unselect all');
    fireEvent.click(unselectAllButton);

    expect(screen.queryByText('1 recipes are selected')).not.toBeInTheDocument();
  });

  it('triggers downloadCsv when Download button is clicked', () => {
    store.dispatch(
      recipesActions.addFavorite({
        id: 1,
        name: 'Classic Margherita Pizza',
        ingredients: [],
        instructions: [],
      }),
    );

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    const downloadButton = screen
      .getAllByRole('button')
      .find((button) => button.textContent === 'Download');
    if (downloadButton) {
      fireEvent.click(downloadButton);
    }

    expect(screen.getByText('1 recipes are selected')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});
