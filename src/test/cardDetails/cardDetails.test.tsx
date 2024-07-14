import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../router/router';

describe('Details Component', () => {
  it('displays loader while fetching data', async () => {
    router.navigate('/details/1');
    render(<RouterProvider router={router} />);
    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  it('displays detailed info correctly', async () => {
    router.navigate('/details/1');
    render(<RouterProvider router={router} />);
    await waitFor(() => {
      const ingredientsElement = screen.queryByText((content, element) => {
        return element?.textContent === 'Ingredients:';
      });
      expect(ingredientsElement).toBeInTheDocument();
    });
  });

  it('displays "Recipe not found" for non existing recipe', async () => {
    router.navigate('/details/1123');
    render(<RouterProvider router={router} />);
    await waitFor(() => {
      expect(screen.getByText('No recipe details found')).toBeInTheDocument();
    });
  });
});
