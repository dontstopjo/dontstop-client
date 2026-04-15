import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts";
import {
  DetailviewPage,
  OverviewPage,
  Mypage,
  MypageUpdate,
  Settings,
  OAuthCallbackPage,
  OAuthFailurePage,
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
