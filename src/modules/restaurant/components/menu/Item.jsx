import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiDelete, apiGet, apiPost } from "../../../../utils/http";
import { FiMoreVertical, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import EditItem from "./EditItem";
import ViewItem from "./ViewItem";
import DeleteItem from "./DeleteItem";

const getMenuApi = "/restaurant/menu/list";
const addMenuApi = "/restaurant/menu/create";
const getCategoryApi = "/restaurant/category/list";

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [newMenu, setNewMenu] = useState({
    menuName: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
    status: "Available",
  });
  const [openMenuId, setOpenMenuId] = useState(null);

  const fetchMenuItems = async () => {
    try {
      const res = await apiGet(getMenuApi);
      setMenuItems(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch menu items");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await apiGet(getCategoryApi);
      setCategories(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.category?._id === selectedCategory)
    : menuItems;

  const handleAddMenu = async (e) => {
    e.preventDefault();
    const payload = {
      menuName: newMenu.menuName,
      category: newMenu.category,
      price: Number(newMenu.price),
      description: newMenu.description,
      imageUrl: newMenu.imageUrl,
      status: newMenu.status,
    };

    try {
      await apiPost(addMenuApi, payload);
      toast.success("Menu added successfully!");
      setIsModalOpen(false);
      setNewMenu({
        menuName: "",
        category: "",
        price: "",
        description: "",
        imageUrl: "",
        status: "Available",
      });
      fetchMenuItems();
    } catch (error) {
      toast.error("Failed to add menu");
    }
  };

  const handleDeleteMenu = async (id) => {
    try {
      await apiDelete(`/restaurant/menu/delete?id=${id}`);
      toast.success("Menu deleted successfully!");
      fetchMenuItems();
      setDeleteItem(null);
    } catch (error) {
      toast.error("Failed to delete menu");
    }
  };

  return (
    <div className="p-6 flex gap-6">
      <div className="w-1/4 bg-white p-4 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="flex flex-col gap-2">
          <li
            className={`p-2 rounded-md cursor-pointer ${
              selectedCategory === null
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </li>
          {categories.map((cat) => (
            <li
              key={cat._id}
              className={`p-2 rounded-md cursor-pointer ${
                selectedCategory === cat._id
                  ? "bg-indigo-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              {cat.categoryName}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-yellow-400 inline-block pb-1">
            Menu Items
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-md hover:opacity-90"
          >
            + Add Menu
          </button>
        </div>

        {filteredMenuItems.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No menu items found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMenuItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden relative group"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.menuName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.menuName}
                  </h3>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === item._id ? null : item._id)
                      }
                      className="p-1 text-gray-600 hover:text-gray-800"
                    >
                      <FiMoreVertical size={20} />
                    </button>

                    {openMenuId === item._id && (
                      <div className="absolute right-0 bottom-full mb-2 bg-white border rounded-md shadow-lg flex flex-col z-50">
                        <button
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                          onClick={() => setEditItem(item)}
                        >
                          <FiEdit /> Edit
                        </button>
                        <button
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                          onClick={() => setViewItem(item)}
                        >
                          <FiEye /> View
                        </button>
                        <button
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-500"
                          onClick={() => setDeleteItem(item)}
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Add New Menu</h2>

            <form onSubmit={handleAddMenu} className="space-y-3">
              <input
                type="text"
                placeholder="Menu Name"
                value={newMenu.menuName}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, menuName: e.target.value })
                }
                required
                className="w-full border rounded-md px-3 py-2"
              />

              <select
                value={newMenu.category}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, category: e.target.value })
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
                value={newMenu.price}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, price: e.target.value })
                }
                required
                className="w-full border rounded-md px-3 py-2"
              />

              <textarea
                placeholder="Description"
                value={newMenu.description}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, description: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={newMenu.imageUrl}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, imageUrl: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              />

              <select
                value={newMenu.status}
                onChange={(e) =>
                  setNewMenu({ ...newMenu, status: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewItem && (
        <ViewItem item={viewItem} onClose={() => setViewItem(null)} />
      )}

      {editItem && (
        <EditItem
          item={editItem}
          categories={categories}
          onClose={() => setEditItem(null)}
          onUpdate={fetchMenuItems}
        />
      )}

      {deleteItem && (
        <DeleteItem
          itemName={deleteItem.menuName}
          onCancel={() => setDeleteItem(null)}
          onConfirm={() => handleDeleteMenu(deleteItem._id)}
        />
      )}
    </div>
  );
}
