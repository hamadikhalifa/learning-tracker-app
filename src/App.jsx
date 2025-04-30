import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import LoadingSpinner from "./components/LoadingSpinner"; // Custom loading spinner component

const Home = lazy(() => import("./pages/Home"));
const Topics = lazy(() => import("./pages/Topics"));
const Goals = lazy(() => import("./pages/Goals"));
const Progress = lazy(() => import("./pages/Progress"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Suspense fallback={<LoadingSpinner />}><Home /></Suspense> },
      { path: "topics", element: <Suspense fallback={<LoadingSpinner />}><Topics /></Suspense> },
      { path: "goals", element: <Suspense fallback={<LoadingSpinner />}><Goals /></Suspense> },
      { path: "progress", element: <Suspense fallback={<LoadingSpinner />}><Progress /></Suspense> },
      { path: "*", element: <Suspense fallback={<LoadingSpinner />}><NotFound /></Suspense> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;