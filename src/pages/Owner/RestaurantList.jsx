// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const RestaurantList = ({onClose}) => {
//   const [restaurants, setRestaurants] = useState([]); // ✅ Start with empty array
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/restaurants/my", {
//           withCredentials: true,
//         });
//         // ✅ Make sure res.data is an array
//         setRestaurants(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Error fetching restaurants:", err);
//         setRestaurants([]); // Fallback to empty array
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   if (loading) return <div className="p-8">Loading...</div>;
//   if (!restaurants.length) return <div className="p-8">No restaurants found.</div>;

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//       {restaurants.map((restaurant) => (
//         <div
//           key={restaurant._id}
//           className="border rounded shadow p-4 flex justify-between items-center"
//         >
//           <div>
//             <h3 className="font-bold text-lg">{restaurant.restaurant_name}</h3>
//             <p className="text-sm text-gray-600">{restaurant.location}</p>
//             <p className="text-sm">Rating: {restaurant.rating}</p>
//           </div>
//           <img
//             src={restaurant.image}
//             alt={restaurant.restaurant_name}
//             className="w-24 h-24 object-cover rounded"
//           />
//         </div>
        
//       ))}
//        <button onClick={onClose} className="text-red-600 hover:underline">
//           Cancel
//         </button>
//     </div>
    
//   );
// };

// export default RestaurantList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RestaurantList = ({ onClose }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({
    restaurant_name: "",
    location: "",
    rating: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/restaurants/my", {
        withCredentials: true,
      });
      setRestaurants(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/restaurants/${id}`,
        editData,
        { withCredentials: true }
      );
      alert("Restaurant updated!");
      setEditing(null);
      fetchRestaurants();
    } catch (err) {
      console.error(err);
      alert("Failed to update restaurant.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this restaurant?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/restaurants/${id}`, {
        withCredentials: true,
      });
      alert("Deleted successfully.");
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!restaurants.length) return <div className="p-8">No restaurants found.</div>;

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {restaurants.map((restaurant) =>
          editing === restaurant._id ? (
            <div key={restaurant._id} className="border rounded p-4 shadow bg-white">
              <h3 className="font-bold text-lg mb-2">Edit Restaurant</h3>
              <input
                name="restaurant_name"
                value={editData.restaurant_name}
                onChange={handleChange}
                placeholder="Restaurant Name"
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="location"
                value={editData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="rating"
                value={editData.rating}
                onChange={handleChange}
                placeholder="Rating"
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="image"
                value={editData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleEditSubmit(restaurant._id)}
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div
              key={restaurant._id}
              className="border rounded shadow p-4 bg-white cursor-pointer"
              onClick={() => navigate(`/restaurants/${restaurant._id}/foods`)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{restaurant.restaurant_name}</h3>
                  <p className="text-sm text-gray-600">{restaurant.location}</p>
                  <p className="text-sm">Rating: {restaurant.rating}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <img
                    src={restaurant.image}
                    alt={restaurant.restaurant_name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditing(restaurant._id);
                        setEditData({
                          restaurant_name: restaurant.restaurant_name,
                          location: restaurant.location,
                          rating: restaurant.rating,
                          image: restaurant.image,
                        });
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(restaurant._id);
                      }}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Cancel Button */}
      <div className="mt-8">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
