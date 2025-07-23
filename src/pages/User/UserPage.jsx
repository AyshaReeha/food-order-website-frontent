
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import foodImage from "../../assets/food2.jpg";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Navbar from "../../components/Navbar";


const UserPage = () => {
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchRestaurant.trim() !== "") {
      navigate(`/restaurant/${encodeURIComponent(searchRestaurant.trim())}`);
    }
  };
  const [searchFood, setSearchFood] = useState("");


const handleFoodSearch = () => {
  if (searchFood.trim() !== "") {
    navigate(`/food?name=${encodeURIComponent(searchFood.trim())}`);
  }
};

  return (
    <div className="font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center min-h-[90vh] p-10 text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${foodImage})` }}
      >
        <div className="bg-black/60 p-8 rounded-lg w-[1000px] h-[400px]">
          <h1 className="text-5xl font-bold mb-4">
            Order Healthy And Fresh Food Any Time
          </h1>
          <p className="text-1xl mb-6 italic">
            Italian food makes people think of big family dinners. So you may
            want to position your restaurant as a place to bring the whole
            family.
          </p>
          <br></br>
          {/* Search Bars */}
          <div className="flex flex-col gap-6">
            {/* Restaurant Search */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchRestaurant}
                onChange={(e) => setSearchRestaurant(e.target.value)}
                placeholder="Search for Restaurants"
                className="px-4 py-2 rounded-md w-300 text-black bg-gray-100"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Search
              </button>
            </div>

            {/* Food Search (not functional here) */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchFood}
                onChange={(e) => setSearchFood(e.target.value)}
                placeholder="Search for Food"
                className="px-4 py-2 rounded-md w-300 text-black bg-gray-100"
              />
              <button
                onClick={handleFoodSearch}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Search
              </button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserPage;
