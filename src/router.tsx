import { createBrowserRouter } from "react-router-dom";
import Ex from "./pages/Ex";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Ex />,
  },
]);
