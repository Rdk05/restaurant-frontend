import { Link } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaChair,
  FaUtensils,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        {/* Sidebar toggle button */}
        <button
          onClick={() => toggleSidebar(null)}
          className="text-gray-600 hover:text-indigo-600 mr-2"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Logo */}
        <Link
          to="/restaurant"
          className="text-xl font-bold text-indigo-600 flex items-center gap-2"
        >
          🍴 MyRestaurant
        </Link>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-6">
        <li>
          <Link
            to="/restaurant"
            className="flex items-center gap-2 text-lg text-gray-600 hover:text-indigo-600"
          >
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <button
            onClick={() => toggleSidebar("sales")}
            className="flex items-center gap-2 text-lg text-gray-600 hover:text-indigo-600"
          >
            <FaChartLine /> Sales
          </button>
        </li>
        <li>
          <button
            onClick={() => toggleSidebar("tables")}
            className="flex items-center gap-2 text-lg text-gray-600 hover:text-indigo-600"
          >
            <FaChair /> Table Management
          </button>
        </li>
        <li>
          <button
            onClick={() => toggleSidebar("menu")}
            className="flex items-center gap-2 text-lg text-gray-600 hover:text-indigo-600"
          >
            <FaUtensils /> Menu
          </button>
        </li>
        <li>
          <Link
            to="/settings"
            className="flex items-center gap-2 text-lg text-gray-600 hover:text-indigo-600"
          >
            <FaCog /> Settings
          </Link>
        </li>
      </ul>

      {/* Right actions */}
      <div className="flex items-center gap-6">
        <button className="text-gray-600 hover:text-indigo-600">🔔</button>
        <button className="text-gray-600 hover:text-indigo-600">👤</button>
        <Link
          to="/restaurant/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
