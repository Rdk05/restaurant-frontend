import React, { useState } from "react";
import Navbar from "./restaurant/Navbar";
import Sidebar from "./restaurant/Sidebar";

export default function RestaurantLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleToggleSidebar = (menu) => {
    if (menu === activeMenu) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setActiveMenu(menu);
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} activeMenu={activeMenu} />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Navbar
          toggleSidebar={handleToggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
