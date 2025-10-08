import React from "react";
import { Routes, Route } from "react-router-dom";
import RestaurantLayout from "../components/layout/RestaurantLayout";
import Dashboard from "../modules/restaurant/pages/Dashboard";
import Orders from "../modules/restaurant/pages/Orders";
import Tables from "../modules/restaurant/pages/Tables";
import Menu from "../modules/restaurant/pages/Menu";
import Profile from "../modules/restaurant/pages/Profile";
import TableManagement from "../modules/restaurant/components/Table/TableManagement";

export default function RestaurantRoutes() {
  return (
    <RestaurantLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="tables" element={<TableManagement />} />
        <Route path="/table" element={<Tables />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </RestaurantLayout>
  );
}
