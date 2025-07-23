// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminRestaurants = () => {
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     const fetchAllRestaurants = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/restaurants", {
//           withCredentials: true,
//         });

//         if (Array.isArray(res.data)) {
//           setRestaurants(res.data);
//         } else {
//           console.error("Unexpected response:", res.data);
//           setRestaurants([]);
//         }
//       } catch (err) {
//         console.error("Error fetching restaurants", err);
//         setRestaurants([]);
//       }
//     };
//     fetchAllRestaurants();
//   }, []);

//   const handleDelete = async (restaurantId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/restaurants/${restaurantId}`, {
//         withCredentials: true,
//       });

//       setRestaurants((prev) => prev.filter((res) => res._id !== restaurantId));
//     } catch (error) {
//       console.error("Failed to delete restaurant", error);
//       alert("Error deleting restaurant");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
//           All Registered Restaurants
//         </h2>

//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300 text-center">
//             <thead>
//               <tr className="bg-gray-200 text-blue-600">
//                 <th className="p-3 border">Name</th>
//                 <th className="p-3 border">Location</th>
//                 <th className="p-3 border">Rating</th>
//                 <th className="p-3 border">Owner</th>
//                 <th className="p-3 border">Image</th>
//                 <th className="p-3 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {restaurants.map((restaurant) => (
//                 <tr key={restaurant._id} className="hover:bg-gray-100">
//                   <td className="p-3 border">{restaurant.restaurant_name}</td>
//                   <td className="p-3 border">{restaurant.location}</td>
//                   <td className="p-3 border">{restaurant.rating}</td>
//                   <td className="p-3 border">
//                     {restaurant.owner?.Name || "Unknown"}
//                   </td>
//                   <td className="p-3 border">
//                     <img
//                       src={restaurant.image}
//                       alt="Restaurant"
//                       className="w-16 h-16 object-cover rounded mx-auto"
//                     />
//                   </td>
//                   <td className="p-3 border">
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                       onClick={() => handleDelete(restaurant._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminRestaurants;
// // AdminRestaurants.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/restaurants");
        setRestaurants(res.data || []);

      } catch (err) {
        console.error("Failed to fetch restaurants", err);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/restaurants/${id}`);
      setRestaurants(prev => prev.filter(restaurant => restaurant._id !== id));
    } catch (err) {
      console.error("Failed to delete restaurant", err);
      alert("Something went wrong while deleting the restaurant.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Restaurants</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200 text-blue-600">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Rating</th>
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant._id} className="hover:bg-gray-100">
                  <td className="p-3 border">{restaurant.restaurant_name}</td>
                  <td className="p-3 border">{restaurant.location}</td>
                  <td className="p-3 border">{restaurant.rating}</td>
                  <td className="p-3 border">
                    <img
                      src={restaurant.image}
                      alt="Restaurant"
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="p-3 border flex flex-col gap-2 items-center">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => navigate(`/admin/restaurant/${restaurant._id}/foods`)}
                    >
                      View Foods
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(restaurant._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {restaurants.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-gray-500">
                    No restaurants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRestaurants;

