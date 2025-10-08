import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../../../utils/http";
import { toast } from "react-toastify";

const getTableApi = "/restaurant/table/list";
const addTableApi = "/restaurant/table/create";

export default function TableManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [newTable, setNewTable] = useState({
    tableName: "",
    capacity: "",
    tableShape: "round",
    status: "Available",
  });
  const [loading, setLoading] = useState(false);

  // Fetch table data
  const fetchTableAPI = async () => {
    try {
      const res = await apiGet(getTableApi);
      setTableData(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTableAPI();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTable((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add Table form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiPost(addTableApi, newTable);
      if (res.data.success) {
        toast.success("Table added successfully!");
        setIsModalOpen(false);
        setNewTable({
          tableName: "",
          capacity: "",
          tableShape: "round",
          status: "Available",
        });
        fetchTableAPI(); // Refresh table list
      } else {
        toast.error(res.data.message || "Failed to add table");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add table");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Table Management
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add Table
          </button>
        </div>

        {/* Table List */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Table No</th>
                <th className="py-2 px-4 border">Capacity</th>
                <th className="py-2 px-4 border">TableShape</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">CreatedAt</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((table, index) => (
                  <tr
                    key={table._id}
                    className="text-center hover:bg-gray-100 transition"
                  >
                    <td className="border py-2 px-4">{index + 1}</td>
                    <td className="border py-2 px-4">{table.tableName}</td>
                    <td className="border py-2 px-4">{table.capacity}</td>
                    <td className="border py-2 px-4">{table.tableShape}</td>
                    <td
                      className={`border py-2 px-4 font-medium ${
                        table.status === "Available"
                          ? "text-green-600"
                          : table.status === "Occupied"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {table.status}
                    </td>
                    <td className="border py-2 px-4">
                      {new Date(table.createdAt).toLocaleString()}
                    </td>
                    <td className="border py-2 px-4 space-x-2">
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                        View
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500 font-medium"
                  >
                    No tables found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal (for Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Add New Table
            </h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-1">Table Number</label>
                <input
                  type="text"
                  name="tableName"
                  value={newTable.tableName}
                  onChange={handleChange}
                  placeholder="Enter Table Number"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={newTable.capacity}
                  onChange={handleChange}
                  placeholder="Enter Capacity"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">TableShape</label>
                <select
                  name="tableShape"
                  value={newTable.tableShape}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                >
                  <option value="Round">Round</option>
                  <option value="Square">Square</option>
                  <option value="Rectangle">Rectangle</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newTable.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Reserved">Reserved</option>
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
