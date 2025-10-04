import React, { useState } from "react";
import Navbar from "./restaurant/Navbar";
import Sidebar from "./restaurant/Sidebar";

export default function RestaurantLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleToggleSidebar = (menu) => {
    setActiveMenu(menu);
    setIsSidebarOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} activeMenu={activeMenu} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Navbar toggleSidebar={handleToggleSidebar} />
        <main className="flex-1 p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
