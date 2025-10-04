import { Link } from "react-router-dom";
import { sidebarMenus } from "./SidebarData";

export default function Sidebar({ isOpen, activeMenu }) {
  if (!isOpen) return null;

  const menu = sidebarMenus[activeMenu] || { title: "Menu", links: [] };

  return (
    <div className="h-full w-64 bg-gradient-to-b from-indigo-600 to-purple-700 p-4 shadow-lg text-white">
      <h2 className="text-lg font-bold mb-6 border-b-4 border-yellow-400 inline-block pb-1">
        {menu.title}
      </h2>

      <ul className="space-y-4">
        {menu.links.map((link, i) => (
          <li key={i}>
            <Link
              to={link.path}
              className="block px-2 py-2 rounded-md hover:bg-indigo-500 hover:pl-4 transition-all duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
