import React, { useEffect, useState } from "react";
import { GetAPI, apiPost } from "../../../../utils/http";
import { toast } from "react-toastify";

const getCategoryApi = "/restaurant/category/list";
const addCategoryApi = "/restaurant/category/create";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    description: "",
    status: "Active",
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await GetAPI(getCategoryApi);
      if (res.data.success) {
        const data = res.data.data || [];
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0]);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiPost(addCategoryApi, newCategory);
      if (res.data.success) {
        toast.success("Category added successfully!");
        setIsModalOpen(false);
        setNewCategory({
          categoryName: "",
          description: "",
          status: "Active",
        });
        fetchCategories();
      } else {
        toast.error(res.data.message || "Failed to add category");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b-4 border-yellow-400 inline-block pb-1">
              🍽️ Categories
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
            >
              + Add
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium border transition-all duration-200 ${
                      selectedCategory?._id === cat._id
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-white hover:bg-indigo-50 text-gray-700"
                    }`}
                  >
                    {cat.categoryName}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No categories found.</p>
          )}
        </div>

        <div className="md:w-2/3 p-6 md:p-8">
          {selectedCategory ? (
            <div className="transition-all duration-300 transform hover:scale-[1.01] bg-white shadow-md border border-gray-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedCategory.categoryName}
              </h3>
              <p className="text-gray-600 text-lg mb-2">
                {selectedCategory.description}
              </p>
              <p
                className={`text-sm font-semibold ${
                  selectedCategory.status === "Active"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                Status: {selectedCategory.status}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-20">
              Select a category to view details.
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Add New Category
            </h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={newCategory.categoryName}
                  onChange={handleChange}
                  placeholder="Category Name"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newCategory.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newCategory.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded text-white ${
                    loading
                      ? "bg-gray-400"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
