import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
  },
]);
