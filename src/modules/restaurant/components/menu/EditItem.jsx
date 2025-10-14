import React, { useState } from "react";
import {  apiPut } from "../../../../utils/http";
import { toast } from "react-toastify";

export default function EditItem({ item, categories, onClose, onUpdate }) {
  const [menuData, setMenuData] = useState({
    id: item._id,
    menuName: item.menuName,
    category: item.category?._id || "",
    price: item.price,
    description: item.description || "",
    imageUrl: item.imageUrl,
    status: item.status,
  });

  const handleEditMenu = async (e) => {
    e.preventDefault();

    try {
      await apiPut(`/restaurant/menu/edit`, menuData);

      toast.success("Menu updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      toast.error("Failed to update menu");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Menu</h2>

        <form onSubmit={handleEditMenu} className="space-y-3">
          <input
            type="text"
            placeholder="Menu Name"
            value={menuData.menuName}
            onChange={(e) =>
              setMenuData({ ...menuData, menuName: e.target.value })
            }
            required
            className="w-full border rounded-md px-3 py-2"
          />

          <select
            value={menuData.category}
            onChange={(e) =>
              setMenuData({ ...menuData, category: e.target.value })
            }
            required
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Price"
            value={menuData.price}
            onChange={(e) =>
              setMenuData({ ...menuData, price: e.target.value })
            }
            required
            className="w-full border rounded-md px-3 py-2"
          />

          <textarea
            placeholder="Description"
            value={menuData.description}
            onChange={(e) =>
              setMenuData({ ...menuData, description: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={menuData.imageUrl}
            onChange={(e) =>
              setMenuData({ ...menuData, imageUrl: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          />

          <select
            value={menuData.status}
            onChange={(e) =>
              setMenuData({ ...menuData, status: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
