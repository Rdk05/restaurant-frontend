import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
  };

  return (
    <div
      className="h-screen flex items-center justify-center 
      bg-gradient-to-br from-indigo-600/80 to-purple-700/80 
      bg-[url('https://img.freepik.com/free-photo/wooden-planks-with-blurred-restaurant-background_1253-56.jpg?semt=ais_hybrid&w=740&q=80')] 
      bg-cover bg-center bg-no-repeat p-6"
    >
      <div className="backdrop-blur-md rounded-2xl shadow-xl w-full max-w-xl p-8">
        {/* Logo */}
        <div className="flex justify-center items-center mb-6">
          <FaUtensils className="text-4xl text-indigo-600" />
          <h1 className="text-2xl font-bold text-indigo-700 ml-2">
            MyRestaurant
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg 
            font-medium hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
