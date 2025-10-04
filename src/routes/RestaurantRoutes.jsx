import React from 'react'
import { Routes, Route } from "react-router-dom";
import RestaurantLayout from "../components/layout/RestaurantLayout";
import Dashboard from "../modules/restaurant/pages/Dashboard";
import Orders from "../modules/restaurant/pages/Orders";
import Tables from "../modules/restaurant/pages/Tables";
import Menu from "../modules/restaurant/pages/Menu";
import Profile from "../modules/restaurant/pages/Profile";


export default function RestaurantRoutes() {
  return (
    <Routes>
      <Route element={<RestaurantLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
