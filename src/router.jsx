import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import Goals from "./pages/Goals";
import Progress from "./pages/Progress";
import NotFound from "./notFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/topics", element: <Topics /> },
      { path: "/goals", element: <Goals /> },
      { path: "/progress", element: <Progress /> },
      { path: "*", element: <NotFound /> }, // This catches all unmatched routes
    ],
  },
]);

export default router;