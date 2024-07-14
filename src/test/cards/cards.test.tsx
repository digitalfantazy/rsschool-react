import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ResultsList from '../../components/ResultList/ResultList';

import { mockRecipes } from './mockRecipes';

describe('Recipes', () => {
  it('renders the specified number of cards', () => {
    render(
      <ResultsList results={mockRecipes} setIsDetailsOpen={() => {}} isDetailsOpen={false} />,
      { wrapper: BrowserRouter },
    );
    const cards = screen.getAllByRole('img', { name: /dish-image/i });
    expect(cards).toHaveLength(mockRecipes.length);
  });

  it('no cards message', () => {
    render(<ResultsList results={[]} setIsDetailsOpen={() => {}} isDetailsOpen={false} />, {
      wrapper: BrowserRouter,
    });
    const response = screen.getByText('No results');
    expect(response).toBeInTheDocument();
  });

  it('renders two users with relevant data', () => {
    render(
      <ResultsList results={mockRecipes} setIsDetailsOpen={() => {}} isDetailsOpen={false} />,
      { wrapper: BrowserRouter },
    );
    const firstUser = screen.getByText(mockRecipes[0].name);
    const secondUser = screen.getByText(mockRecipes[1].name);
    expect(firstUser).toBeInTheDocument();
    expect(secondUser).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();
    render(
      <ResultsList results={mockRecipes} setIsDetailsOpen={() => {}} isDetailsOpen={false} />,
      {
        wrapper: BrowserRouter,
      },
    );

    const userItem = screen.getByText(mockRecipes[0].name);

    user.click(userItem);

    await waitFor(() => expect(window.location.pathname).toBe(`/details/11`));
  });
});
