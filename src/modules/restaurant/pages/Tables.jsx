import React, { useEffect, useState } from "react";
import { apiGet } from "../../../utils/http";
import Menu from "./Menu";

const getTableApi = "/restaurant/table/list";

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);

  const fetchTables = async () => {
    try {
      const res = await apiGet(getTableApi);
      const allTables = res?.data?.data;

      const activeTables = allTables.filter(
        (table) =>
          table.status === true ||
          table.status === 1 ||
          table.isActive === true ||
          table.isActive === 1
      );

      setTables(activeTables);
    } catch (error) {
      console.error("Error fetching tables:", error);
      setTables([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleClick = (table) => {
    setSelectedTable(table);
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">Loading tables...</div>
    );
  }

  if (selectedTable) {
    return <Menu table={selectedTable} onBack={() => setSelectedTable(null)} />;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tables.map((table, index) => (
          <div
            key={table._id || table.id || index}
            onClick={() => handleClick(table)}
            className="cursor-pointer p-6 rounded-xl text-center border-2 shadow-md bg-green-50 border-green-400 hover:bg-green-100 transition-all duration-300"
          >
            {/* 🔘 Index Number */}
            <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-white shadow-inner border">
              <span className="text-lg font-semibold text-gray-700">
                {index + 1}
              </span>
            </div>

            {/* 🏷️ Table Info */}
            <h3 className="text-base font-semibold text-gray-700">
              {table.tableName || "N/A"}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              Capacity:{" "}
              <span className="font-medium">{table.capacity || "N/A"}</span>
            </p>

            <p className="text-sm text-gray-600">
              Shape:{" "}
              <span className="font-medium capitalize">
                {table.tableShape || "N/A"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
