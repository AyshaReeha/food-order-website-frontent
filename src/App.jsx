import React from 'react'
import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/Home/Signup"; 

import AdminPage from "./pages/Admin/AdminPage";

import UserPage from './pages/User/UserPage.jsx';
import RestaurantDetails from './pages/User/RestaurantDetails.jsx';
import FoodSearchResults from './pages/User/FoodSearchDetails.jsx';
import RestaurantFoodList from './pages/User/RestaurantFoodDetails.jsx';
import CartPage from './pages/User/CartPage.jsx';
import OwnerDashboard from './pages/Owner/OwnerDashboard.jsx';
import FoodList from './pages/Owner/FoodList.jsx';
import AdminUsers from './pages/Admin/AdminUsers.jsx';
import AdminOwners from './pages/Admin/AdminOwners.jsx';
 import AdminRestaurants from './pages/Admin/AdminRestaurants.jsx';
import AdminRestaurantFoods from './pages/Admin/AdminRestaurantfoods.jsx';
import DeliveryDetails from './pages/User/DeliveryDetails.jsx';
import PaymentPage from './pages/User/PaymentPage.jsx';




const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/restaurant/:name" element={<RestaurantDetails />} />
        <Route path="/food" element={<FoodSearchResults />} />
        <Route path="/restaurant/:id/foods" element={<RestaurantFoodList/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/restaurants/:id/foods" element={<FoodList />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/owners" element={<AdminOwners />} />
        <Route path="/admin/restaurants" element={<AdminRestaurants />} />
        <Route path="/admin/restaurant/:id/foods" element={<AdminRestaurantFoods />} />
        <Route path="/checkout/delivery" element={<DeliveryDetails />} />
        <Route path="/payment" element={<PaymentPage />} />

      </Routes>
  
  )
}

export default App