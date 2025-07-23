
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";


const RestaurantDetails = () => {
    const navigate = useNavigate();

  const { name } = useParams(); // e.g. "PizzaPlace"
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/restaurants/search?name=${encodeURIComponent(name)}`
        );

        const data = res.data;
        if (data.success && data.restaurants.length > 0) {
          setRestaurants(data.restaurants);
        } else {
          setError("No restaurant found");
        }
      } catch (err) {
        setError("Failed to load restaurant");
      }
    };
    fetchRestaurant();
  }, [name]);

  return (
    <div className="font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-10 bg-amber-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Search Results for: <span className="italic">{name}</span>
        </h2>

        {error && <p className="text-red-600">{error}</p>}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {restaurants.map((restaurant, idx) => (
    <div
      key={idx}
      className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/restaurant/${restaurant._id}/foods`}>
        <img
          src={restaurant.image}
          alt={restaurant.restaurant_name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-yellow-700 mb-2">
          {restaurant.restaurant_name}
        </h2>
        <p className="text-gray-700 mb-1">
          <strong>Location:</strong> {restaurant.location}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Rating:</strong> ⭐ {restaurant.rating}
        </p>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default RestaurantDetails;
