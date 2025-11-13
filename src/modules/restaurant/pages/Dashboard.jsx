import React, { useState } from "react";
import Tables from "./Tables";

export default function Dashboard() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col">
      <header className="bg-white shadow-md rounded-2xl px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-700">🍽️ Restaurant Dashboard</h1>
      </header>

      <main className="flex-1 mt-6 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[80vh]">
        <Tables/>
      </main>
    </div>
  );
}
