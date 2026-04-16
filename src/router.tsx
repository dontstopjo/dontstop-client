import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts';
import {
  CreateViewPage,
  DetailviewPage,
  EditViewPage,
  OverviewPage,
} from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <OverviewPage />,
      },
      {
        path: '/detail/:id',
        element: <DetailviewPage />,
      },
      {
        path: '/create',
        element: <CreateViewPage />,
      },
      {
        path: '/edit/:id',
        element: <EditViewPage />,
      },
    ],
  },
]);
