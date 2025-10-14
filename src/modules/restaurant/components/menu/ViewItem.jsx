import React from "react";

export default function ViewItem({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">{item.menuName}</h2>

        <img
          src={item.imageUrl}
          alt={item.menuName}
          className="w-full h-48 object-cover rounded-md mb-4"
        />

        <p>
          <strong>Category:</strong> {item.category?.categoryName}
        </p>
        <p>
          <strong>Price:</strong> {item.price}/-
        </p>
        <p>
          <strong>Status:</strong> {item.status}
        </p>
        <p className="mt-2">
          <strong>Description:</strong> {item.description || "N/A"}
        </p>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
