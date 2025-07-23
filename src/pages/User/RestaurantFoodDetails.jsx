// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar";

// const RestaurantFoodList = () => {
// //  
// const navigate = useNavigate();

//  const { id } = useParams();
//   console.log("Fetched restaurant ID:", id); // ✅ add here

//   const [foods, setFoods] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchFoods = async () => {
//       try {
//         console.log(`Calling: http://localhost:5000/api/foods/byrestaurant/${id}`);
//         const res = await axios.get(`http://localhost:5000/api/foods/byrestaurant/${id}`);
//         if (res.data.success) {
//           setFoods(res.data.foods);
//           setError(""); // clear old errors
//         } else {
//           setError("No foods found");
//         }
//       } catch (err) {
//         console.error("Error fetching foods:", err.response?.data || err.message);
//         setError("Something went wrong while fetching food data.");
//       }
//     };

//     fetchFoods();
//   }, [id]);

//   return (
//     <div className="font-sans">
//       {/* Navbar */}
     
//      <Navbar />

//       {/* Food List */}
//       <div className="p-10 bg-amber-50 min-h-screen">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">
//           Foods from the restaurant
//         </h2>
//         {error && <p className="text-red-600">{error}</p>}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {foods.map((food, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src={food.image}
//                 alt={food.food_name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-2xl font-semibold mb-2">{food.food_name}</h2>
//                 <p className="text-gray-600 mb-1">Price: ₹{food.price}</p>
//                 <p className="text-gray-600 mb-1">Type: {food.food_type}</p>
//                 <p className="text-gray-600">
//                   Restaurant: {food.restaurant?.restaurant_name || "N/A"}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantFoodList;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const RestaurantFoodList = () => {
  const { id } = useParams(); // restaurant ID
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/foods/byrestaurant/${id}`);
        if (res.data.success && res.data.foods.length > 0) {
          setFoods(res.data.foods);

          const initialQty = {};
          res.data.foods.forEach((f) => {
            initialQty[f._id] = 0;
          });
          setQuantities(initialQty);
        } else {
          setError("No foods found for this restaurant.");
        }
      } catch (err) {
        console.error("Error fetching foods:", err);
        setError("Failed to load food data.");
      }
    };

    fetchFoods();
  }, [id]);

  const handleQuantityChange = (foodId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: Math.max(0, (prev[foodId] || 0) + change),
    }));
  };

  const handleAddToCart = async (food) => {
    const quantity = quantities[food._id] || 0;
    if (quantity === 0) return alert("Please select a quantity.");

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id;

    if (!userId) {
      alert("Please log in to add to cart.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        foodId: food._id,
        quantity,
      });
      alert(`${quantity} x ${food.food_name} added to cart`);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div className="font-sans">
      <Navbar />
      <div className="p-10 bg-amber-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Foods from the restaurant
        </h2>

        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={food.image}
                alt={food.food_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{food.food_name}</h2>
                <p className="text-gray-600 mb-1">₹{food.price}</p>
                <p className="text-gray-600 mb-1 capitalize">
                  Type: {food.food_type}
                </p>
                <p className="text-gray-600">
                  Restaurant: {food.restaurant?.restaurant_name || "N/A"}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(food._id, -1)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {quantities[food._id] || 0}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(food._id, 1)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(food)}
                    disabled={(quantities[food._id] || 0) === 0}
                    className={`px-4 py-2 rounded ${
                      (quantities[food._id] || 0) > 0
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantFoodList;
