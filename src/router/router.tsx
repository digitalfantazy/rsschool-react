import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import NotFound from './notFoundPage/NotFound';
import ErrorPage from './notFoundPage/NotFound';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'details/:id',
        element: <RecipeDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
