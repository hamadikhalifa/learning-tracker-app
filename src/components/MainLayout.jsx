import { NavLink, Outlet } from "react-router-dom";
import { Home, BookOpen, CheckSquare, BarChart } from "lucide-react";

const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { path: "/", name: "Home", icon: <Home size={18} className="text-blue-500" /> },
    { path: "/topics", name: "Topics", icon: <BookOpen size={18} className="text-purple-500" /> },
    { path: "/goals", name: "Goals", icon: <CheckSquare size={18} className="text-green-500" /> },
    { path: "/progress", name: "Progress", icon: <BarChart size={18} className="text-yellow-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 text-gray-800 font-sans">
      <div className="flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white shadow-md px-8 py-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Learning Tracker App</h1>
          <nav className="mt-4 md:mt-0 flex gap-12 text-sm font-medium">
            {navLinks.map(({ path, name, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-blue-700 font-semibold border-b-4 border-blue-700 pb-1 px-4 transition-all"
                    : "flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:border-b-4 hover:border-blue-400 pb-1 px-4 transition-all"
                }
              >
                {icon}
                {name}
              </NavLink>
            ))}
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow px-4 md:px-8 py-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[calc(100vh-12rem)]">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white py-3 text-center shadow-inner text-sm text-gray-500">
          &copy; {currentYear} Hamadi's Learning Tracker. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;