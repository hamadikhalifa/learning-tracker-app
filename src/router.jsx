import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import Goals from "./pages/Goals";
import Progress from "./pages/Progress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "topics", element: <Topics /> },
      { path: "goals", element: <Goals /> },
      { path: "progress", element: <Progress /> },
    ],
  },
]);

export default router;