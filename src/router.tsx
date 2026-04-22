import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts";
import {
  DetailviewPage,
  OverviewPage,
  Mypage,
  MypageUpdate,
  Settings,
  OAuthCallbackPage,
  CreateViewPage,
  EditViewPage,
  OAuthFailurePage,
  SearchPage,
  UserPage,
} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <OverviewPage />,
      },
      {
        path: "/detail/:id",
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
      {
        path: "/my",
        element: <Mypage />,
      },
      {
        path: "/update-my",
        element: <MypageUpdate />,
      },
      {
        path: "/setting",
        element: <Settings />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/user/:userId",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/oauth2/success",
    element: <OAuthCallbackPage />,
  },
  {
    path: "/oauth2/failure",
    element: <OAuthFailurePage />,
  },
]);
