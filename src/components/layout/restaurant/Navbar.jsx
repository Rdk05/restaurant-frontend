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
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);

  const menuLinks = [
    { label: "Home", icon: <FaHome />, path: "/restaurant" },
    { label: "Sales", icon: <FaChartLine />, action: () => toggleSidebar("sales") },
    { label: "Table Management", icon: <FaChair />, action: () => toggleSidebar("tables") },
    { label: "Menu", icon: <FaUtensils />, action: () => toggleSidebar("menu") },
    { label: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <nav className="bg-white shadow-md px-4 py-3 md:px-8 md:py-4 relative z-50">
      <div className="flex justify-between items-center">
        {/* Left: Mobile Sidebar toggle + Logo */}
        <div className="flex items-center gap-4">
          {/* Sidebar toggle - only visible on mobile */}
          <button
            onClick={() => toggleSidebar(!isSidebarOpen)}
            className="text-gray-600 hover:text-indigo-600 md:hidden"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Logo */}
          <Link
            to="/restaurant"
            className="text-xl font-bold text-indigo-600 flex items-center gap-2"
          >
            MyRestaurant
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {menuLinks.map((item, idx) => (
            <li key={idx}>
              {item.path ? (
                <Link
                  to={item.path}
                  className="flex items-center gap-2 text-gray-600 text-lg hover:text-indigo-600 transition"
                >
                  {item.icon} {item.label}
                </Link>
              ) : (
                <button
                  onClick={item.action}
                  className="flex items-center gap-2 text-gray-600 text-lg hover:text-indigo-600 transition"
                >
                  {item.icon} {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-indigo-600">👤</button>

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/restaurant/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          )}

          {/* Mobile menu toggle - optional secondary menu */}
          <button
            onClick={handleMobileMenuToggle}
            className="text-gray-600 hover:text-indigo-600 md:hidden ml-2"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (optional additional links) */}
      {mobileMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col">
          {menuLinks.map((item, idx) => (
            <li key={idx} className="border-b border-gray-200">
              {item.path ? (
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 transition"
                >
                  <div className="flex items-center gap-2">{item.icon} {item.label}</div>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    item.action();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-indigo-50 transition"
                >
                  <div className="flex items-center gap-2">{item.icon} {item.label}</div>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
