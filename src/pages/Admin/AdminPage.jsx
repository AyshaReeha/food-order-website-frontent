import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center pt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="flex flex-col w-full max-w-md space-y-4 px-4">
        <button
          onClick={() => navigate("/admin/users")}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-md text-lg font-medium"
        >
          View All Users
        </button>
        <button
          onClick={() => navigate("/admin/owners")}
          className="w-full  bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-md text-lg font-medium"
        >
          View Restaurant Owners
        </button>
        <button
          onClick={() => navigate("/admin/restaurants")}
          className="w-full  bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-md text-lg font-medium"
        >
          View All Restaurants
        </button>
        {/* <button
          onClick={() => navigate("/admin/foods")}
          className="w-full  bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-md text-lg font-medium"
        >
          View Food Items
        </button> */}
        <button
          onClick={() => navigate("/admin/orders")}
          className="w-full  bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-md text-lg font-medium"
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
