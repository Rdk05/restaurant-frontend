import React, { useEffect, useState } from "react";
import { apiGet } from "../../../utils/http";

const getMenuApi = "/restaurant/menu/list";

export default function Menu({ table, onBack }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const fetchMenu = async () => {
    try {
      const res = await apiGet(getMenuApi);
      setMenuItems(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-medium text-gray-500">
        Loading menu...
      </div>
    );
  }

  if (selectedMenu) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen overflow-y-auto">
        <button
          onClick={() => setSelectedMenu(null)}
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl mx-auto">
          <div className="h-56 w-full mb-4 rounded-xl bg-gray-100 overflow-hidden">
            <img
              src={
                selectedMenu.imageUrl && selectedMenu.imageUrl !== ""
                  ? selectedMenu.imageUrl
                  : "https://via.placeholder.com/300?text=No+Image"
              }
              alt={selectedMenu.menuName}
              className="object-cover w-full h-full"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {selectedMenu.menuName}
          </h2>
          <p className="text-gray-600 mb-3">
            {selectedMenu.description ||
              "A delicious, freshly prepared dish made to perfection!"}
          </p>

          <p className="text-indigo-700 font-bold text-xl mb-4">
            ₹{selectedMenu.price}/-
          </p>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Add to Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <button
        onClick={onBack}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold mb-4">
        Menu for <span className="text-indigo-600">{table.tableName}</span>
      </h2>

      {menuItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedMenu(item)}
              className="relative overflow-hidden group border rounded-2xl p-5 bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="h-40 w-full mb-4 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
                <img
                  src={
                    item.imageUrl && item.imageUrl !== ""
                      ? item.imageUrl
                      : "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={item.menuName}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="font-semibold text-xl text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                {item.menuName}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.description || "Delicious and freshly prepared meal"}
              </p>

              <div className="flex justify-between items-center">
                <p className="text-indigo-700 font-bold text-lg">
                  ₹{item.price}/-
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Added to order!");
                  }}
                  className="text-sm px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Add
                </button>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-indigo-100/50 to-transparent transition-all rounded-2xl"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center mt-10 text-lg font-medium">
          No menu items found 🍴
        </div>
      )}
    </div>
  );
}
