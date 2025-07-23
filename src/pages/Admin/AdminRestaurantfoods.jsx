// // AdminRestaurantFoods.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";

// const AdminRestaurantFoods = () => {
//   const { id } = useParams();
//   const [foods, setFoods] = useState([]);

//   useEffect(() => {
//     const fetchFoods = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/foods/byrestaurant/${id}`, {
//           withCredentials: true,
//         });
//         setFoods(res.data.foods || []);
//       } catch (err) {
//         console.error("Error fetching foods", err);
//       }
//     };

//     fetchFoods();
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-blue-50 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-semibold text-gray-800">Foods in This Restaurant</h2>
//           <Link to="/admin/restaurants">
//             <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
//               Back to Restaurants
//             </button>
//           </Link>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300 text-center">
//             <thead>
//               <tr className="bg-gray-200 text-blue-600">
//                 <th className="p-3 border">Name</th>
//                 <th className="p-3 border">Price</th>
//                 <th className="p-3 border">Description</th>
//                 <th className="p-3 border">Type</th>
//                 <th className="p-3 border">Image</th>
//               </tr>
//             </thead>
//                       <tbody>
//                           {foods.length > 0 ? (
//                               foods.map((food) => (
//                                   <tr key={food._id} className="hover:bg-gray-100">
//                                       <td className="p-3 border">{food.food_name}</td>
//                                       <td className="p-3 border">₹{food.price}</td>
//                                       <td className="p-3 border">{food.description}</td>
//                                       <td className="p-3 border capitalize">{food.food_type}</td>
//                                       <td className="p-3 border">
//                                           <img
//                                               src={food.image}
//                                               alt="Food"
//                                               className="w-16 h-16 object-cover rounded mx-auto"
//                                           />
//                                       </td>
//                                   </tr>
//                               ))
//                           ) : (
//                               <tr>
//                                   <td colSpan="5" className="p-4 text-gray-500">
//                                       No foods available for this restaurant.
//                                   </td>
//                               </tr>
//                           )}
//                       </tbody>

//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminRestaurantFoods;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminRestaurantFoods = () => {
  const [foods, setFoods] = useState([]);
  const { id } = useParams(); // restaurantId

 useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/foods/byrestaurant/${id}`, {
          withCredentials: true,
        });
        setFoods(res.data.foods || []);
      } catch (err) {
        console.error("Error fetching foods", err);
      }
    };

    fetchFoods();
  }, [id]);

//   const handleDelete = async (foodId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this food?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/foods/${foodId}`);
//       setFoods((prevFoods) => prevFoods.filter((food) => food._id !== foodId));
//       alert("Food deleted successfully!");
//     } catch (error) {
//       console.error("Failed to delete food", error);
//       alert("Error deleting food. Please try again.");
//     }
//   };
 const handleDelete = async (foodId) => {
    const confirm = window.confirm("Are you sure you want to delete this food?");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:5000/api/foods/${foodId}`, {
        withCredentials: true,
      });
      setFoods((prev) => prev.filter((f) => f._id !== foodId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Foods in Restaurant</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200 text-blue-600">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.length > 0 ? (
                foods.map((food) => (
                  <tr key={food._id} className="hover:bg-gray-100">
                    <td className="p-3 border">{food.food_name}</td>
                    <td className="p-3 border">₹{food.price}</td>
                    <td className="p-3 border">{food.description}</td>
                    <td className="p-3 border capitalize">{food.food_type}</td>
                    <td className="p-3 border">
                      <img
                        src={food.image}
                        alt="Food"
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="p-3 border space-x-2">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(food._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-gray-500">
                    No foods available for this restaurant.
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

export default AdminRestaurantFoods;
