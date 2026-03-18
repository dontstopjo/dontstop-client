import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts';
import { OverviewPage } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <OverviewPage></OverviewPage>,
      },
    ],
  },
]);
