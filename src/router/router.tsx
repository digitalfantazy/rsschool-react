import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import NotFound from './notFoundPage/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
