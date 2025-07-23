// import React, { useState } from "react";
// import AddRestaurantForm from "./AddRestaurantForm";
// import AddFoodForm from "./AddFoodForm";
// import RestaurantList from "./RestaurantList";
// import FoodList from "./FoodList";

// const OwnerDashboard = () => {
//   const [showAddRestaurant, setShowAddRestaurant] = useState(false);
//   const [showAddFood, setShowAddFood] = useState(false);
//   const [showRestaurants, setShowRestaurants] = useState(false);
//   const [showFoodItems, setShowFoodItems] = useState(false);

//   return (
//     <div className="p-10 text-center">
//       <h1 className="text-3xl font-bold mb-8">Welcome to Owner's Dashboard</h1>

//       <div className="flex flex-wrap justify-center gap-6 mb-8">
//         <button onClick={() => setShowAddRestaurant(true)} className="btn">Add Restaurant</button>
//         <button onClick={() => setShowAddFood(true)} className="btn">Add Food Item</button>
//         <button onClick={() => setShowRestaurants(true)} className="btn">View Restaurants</button>
//         <button onClick={() => setShowFoodItems(true)} className="btn">View Food Items</button>
//       </div>

//       {/* Forms */}
//       {showAddRestaurant && (
//         <AddRestaurantForm onClose={() => setShowAddRestaurant(false)} />
//       )}
//       {showAddFood && (
//         <AddFoodForm onClose={() => setShowAddFood(false)} />
//       )}

//       {/* Lists */}
//       {showRestaurants && <RestaurantList />}
//       {showFoodItems && <FoodList />}
//     </div>
//   );
// };

// export default OwnerDashboard;
import React, { useState } from "react";
import AddRestaurantForm from "./AddRestaurantForm";
import AddFoodForm from "./AddFoodForm";
import RestaurantList from "./RestaurantList";
import OwnerFoodList from "./FoodList";

const OwnerDashboard = () => {
  const [activeSection, setActiveSection] = useState(""); // track which section is open

  const renderContent = () => {
    switch (activeSection) {
      case "addRestaurant":
        return <AddRestaurantForm onClose={() => setActiveSection("")} />;
      case "addFood":
        return <AddFoodForm onClose={() => setActiveSection("")} />;
      case "viewRestaurants":
        return <RestaurantList onClose={() => setActiveSection("")} />;
      case "viewFoods":
        return <OwnerFoodList onClose={() => setActiveSection("")} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center mt-10 gap-6">
            <h1 className="text-3xl font-bold text-yellow-600 mb-6">
              Welcome to the Owner’s Page
            </h1>
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 w-64"
              onClick={() => setActiveSection("addRestaurant")}
            >
              Add Restaurant
            </button>
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 w-64"
              onClick={() => setActiveSection("addFood")}
            >
              Add Food Item
            </button>
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 w-64"
              onClick={() => setActiveSection("viewRestaurants")}
            >
              View Restaurants
            </button>
            {/* <button
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 w-64"
              onClick={() => setActiveSection("viewFoods")}
            >
              View Food Items
            </button> */}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      {renderContent()}
    </div>
  );
};

export default OwnerDashboard;
