import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantRoutes from "./RestaurantRoutes";
import Login from "../components/pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/restaurant/login" element={<Login />} />
          <Route
            path="/restaurant/*"
            element={
              <ProtectedRoute>
                <RestaurantRoutes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
