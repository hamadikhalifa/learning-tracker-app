import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold mb-2 text-center">
        Welcome to the Learning Tracker App
      </h1>
      <ul className="flex justify-center space-x-6">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/topics" className="hover:underline">
            Topics
          </Link>
        </li>
        <li>
          <Link to="/goals" className="hover:underline">
            Goals
          </Link>
        </li>
        <li>
          <Link to="/progress" className="hover:underline">
            Progress
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;