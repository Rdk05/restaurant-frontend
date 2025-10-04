
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantRoutes from "./RestaurantRoutes";
import Login from '../components/pages/Login';
// import AdminRoutes from "./AdminRoutes";
// import UserRoutes from "./UserRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Side */}
        {/* <Route path="/*" element={<UserRoutes />} /> */}

        {/* Admin Panel */}
        {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}

        {/* Restaurant Panel */}
        <Route path="/restaurant/login*" element={<Login />} />
        <Route path="/restaurant/*" element={<RestaurantRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
