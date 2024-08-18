import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from './NotFoundPage/NotFoundPage';
import ErrorPage from './ErrorPage/ErrorPage';
import { UnControlledForm } from '../components/Forms/index';
import { ControlledForm } from '../components/Forms/index';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/uncontrolled-form',
    element: <UnControlledForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/controlled-form',
    element: <ControlledForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
