import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-48 bg-blue-600 text-white p-4 flex flex-col space-y-4">
        <h1 className="text-xl font-bold">Welcome to my learning tracker app</h1>
        <p className="text-sm">Track your progress and stay on top of your learning goals</p>

        <nav className="mt-6 flex flex-col space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-l-4 border-white pl-2 font-semibold"
                : "hover:text-blue-200 pl-2"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/topics"
            className={({ isActive }) =>
              isActive
                ? "border-l-4 border-white pl-2 font-semibold"
                : "hover:text-blue-200 pl-2"
            }
          >
            Topics
          </NavLink>
          <NavLink
            to="/goals"
            className={({ isActive }) =>
              isActive
                ? "border-l-4 border-white pl-2 font-semibold"
                : "hover:text-blue-200 pl-2"
            }
          >
            Goals
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              isActive
                ? "border-l-4 border-white pl-2 font-semibold"
                : "hover:text-blue-200 pl-2"
            }
          >
            Progress
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;