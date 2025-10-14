// src/data/sidebarMenus.js
export const sidebarMenus = {
  tables: {
    title: "Table Management",
    links: [
      { path: "/restaurant/table/tables", label: "Tables" },
      { path: "/restaurant/reservations", label: "Reservations" },
    ],
  },
  sales: {
    title: "Sales Management",
    links: [
      { path: "/restaurant/sales", label: "Sales" },
      { path: "/restaurant/earnings", label: "Earnings" },
    ],
  },
  menu: {
    title: "Menu Management",
    links: [
      { path: "/restaurant/menu/categories", label: "Categories" },
      { path: "/restaurant/menu/item", label: "Item" },
      { path: "/restaurant/menu/add", label: "Add New Dish" },
    ],
  },
};
