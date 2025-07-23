

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const RestaurantFoodList = () => {
//   const { id } = useParams(); // restaurantId
//   const navigate = useNavigate();
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFoods = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/foods/byrestaurant/${id}`, {
//           withCredentials: true,
//         });
//         setFoods(res.data.foods || []);
//       } catch (err) {
//         console.error("Error fetching foods:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFoods();
//   }, [id]);

//   const handleDelete = async (foodId) => {
//     const confirm = window.confirm("Delete this food?");
//     if (!confirm) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/foods/${foodId}`, {
//         withCredentials: true,
//       });
//       setFoods((prev) => prev.filter((f) => f._id !== foodId));
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   if (loading) return <div className="p-8">Loading...</div>;
//   if (!foods.length) return <div className="p-8">No food items found.</div>;

//   return (
//     <div className="mt-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Foods in This Restaurant</h2>
//       {foods.map((f) => (
//         <div
//           key={f._id}
//           className="flex items-center justify-between p-4 border rounded mb-2"
//         >
//           <div className="flex items-center gap-4">
//             <img
//               src={f.image}
//               alt={f.food_name}
//               className="w-16 h-16 object-cover rounded"
//             />
//             <div>
//               <h3 className="font-bold">{f.food_name}</h3>
//               <p className="text-gray-600">
//                 ₹{f.price} • {f.food_type}
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => alert("Edit not implemented")}
//               className="px-3 py-1 bg-blue-500 text-white rounded"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(f._id)}
//               className="px-3 py-1 bg-red-500 text-white rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//       <button
//         onClick={() => navigate(-1)}
//         className="text-red-600 hover:underline mt-4 block mx-auto"
//       >
//         Cancel
//       </button>
//     </div>
//   );
// };

// export default RestaurantFoodList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FoodList = () => {
  const { id } = useParams(); // restaurantId
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFood, setEditingFood] = useState(null); // 🍽 currently editing food
  const [formData, setFormData] = useState({
    food_name: "",
    price: "",
    food_type: "",
    image: ""
  });

  useEffect(() => {
    fetchFoods();
  }, [id]);

  const fetchFoods = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/foods/byrestaurant/${id}`, {
        withCredentials: true,
      });
      setFoods(res.data.foods || []);
    } catch (err) {
      console.error("Error fetching foods:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (foodId) => {
    const confirm = window.confirm("Delete this food?");
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

  const openEditForm = (food) => {
    setEditingFood(food._id);
    setFormData({
      food_name: food.food_name,
      price: food.price,
      food_type: food.food_type,
      image: food.image,
    });
  };

  const handleEditChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/foods/${editingFood}`,
        formData,
        { withCredentials: true }
      );
      alert("Food updated!");
      setEditingFood(null);
      fetchFoods(); // refresh the list
    } catch (err) {
      console.error("Failed to update food:", err);
      alert("Update failed.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!foods.length) return <div className="p-8">No food items found.</div>;

  return (
    <div className="mt-6 max-w-3xl mx-auto relative">
      <h2 className="text-2xl font-semibold mb-4 text-center">Foods in This Restaurant</h2>
      {foods.map((f) => (
        <div
          key={f._id}
          className="flex items-center justify-between p-4 border rounded mb-2"
        >
          <div className="flex items-center gap-4">
            <img
              src={f.image}
              alt={f.food_name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-bold">{f.food_name}</h3>
              <p className="text-gray-600">
                ₹{f.price} • {f.food_type}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => openEditForm(f)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(f._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Cancel */}
      <button
        onClick={() => navigate(-1)}
        className="text-red-600 hover:underline mt-4 block mx-auto"
      >
        Cancel
      </button>

      {/* Edit Modal */}
      {editingFood && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Edit Food Item</h3>
            <input
              type="text"
              name="food_name"
              value={formData.food_name}
              onChange={handleEditChange}
              placeholder="Food Name"
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleEditChange}
              placeholder="Price"
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="food_type"
              value={formData.food_type}
              onChange={handleEditChange}
              placeholder="Food Type"
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleEditChange}
              placeholder="Image URL"
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingFood(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodList;
