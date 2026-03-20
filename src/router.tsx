import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts";
import { DetailviewPage, OverviewPage } from "./pages";
import Mypage from "./pages/Mypage";
import MypageUpdate from "./pages/MypageUpdate";
import Settings from "./pages/Settings";

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
]);
