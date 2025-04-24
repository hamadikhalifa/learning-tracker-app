import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">My Annual Budget</h1>
      <ul className="flex space-x-4">
        <li><a href="#" className="hover:text-gray-300">Home</a></li>
        <li><a href="#" className="hover:text-gray-300">Expenses</a></li>
        <li><a href="#" className="hover:text-gray-300">Report</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;