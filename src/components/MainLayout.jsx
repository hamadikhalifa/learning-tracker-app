import { NavLink, Outlet } from "react-router-dom";
import { Home, BookOpen, Target, BarChart2 } from "lucide-react";

const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { path: "/", name: "Home", icon: Home },
    { path: "/topics", name: "Topics", icon: BookOpen },
    { path: "/goals", name: "Goals", icon: Target },
    { path: "/progress", name: "Progress", icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 text-gray-800 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white shadow-md px-8 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <BookOpen size={24} className="text-blue-600" />
          Learning Tracker App
        </h1>
        <nav className="mt-4 md:mt-0 flex gap-6 text-sm font-medium">
          {navLinks.map(({ path, name, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              aria-label={`Go to ${name} page`}
              title={name}
              className={({ isActive }) =>
                `flex items-center gap-1 pb-1 px-4 transition-all transform ${
                  isActive
                    ? "text-blue-700 font-semibold border-b-4 border-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:border-b-4 hover:border-blue-400 hover:scale-105"
                }`
              }
            >
              <Icon size={18} className="flex-shrink-0" />
              <span>{name}</span>
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
  );
};

export default MainLayout;