// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

// const Navbar = () => {
//   const navigate = useNavigate();

//   return ( // ✅ return is required
//     <nav className="flex items-center justify-between px-8 py-4 bg-yellow-500 text-white shadow-md">
//       <div
//         className="text-2xl font-bold cursor-pointer"
//         onClick={() => navigate("/home")}
//       >
//         FoodXpress
//       </div>

//       <div className="flex gap-8 text-lg items-center">
//         <button onClick={() => navigate("/home")} className="hover:text-black">
//           Home
//         </button>
//         <button onClick={() => navigate("/orders")} className="hover:text-black">
//           Orders
//         </button>
//         <button onClick={() => navigate("/contact")} className="hover:text-black">
//           Contact
//         </button>
//         <button onClick={() => navigate("/cart")} className="hover:text-black flex items-center gap-1">
//           <FaShoppingCart /> Cart
//         </button>
//         <button onClick={() => navigate("/profile")} className="hover:text-black flex items-center gap-1">
//           <FaUserCircle /> Profile
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Close profile popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("user");
  alert("Logout successful");
  setTimeout(() => {
    navigate("/");
  }, 500); // delay 0.5 seconds before redirect
};

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-yellow-500 text-white shadow-md relative">
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/home")}
      >
        FoodXpress
      </div>

      <div className="flex gap-8 text-lg items-center">
        <button onClick={() => navigate("/home")} className="hover:text-black">Home</button>
        <button onClick={() => navigate("/orders")} className="hover:text-black">Orders</button>
        <button onClick={() => navigate("/contact")} className="hover:text-black">Contact</button>
        <button onClick={() => navigate("/cart")} className="hover:text-black flex items-center gap-1">
          <FaShoppingCart /> Cart
        </button>

        {/* Profile Button */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setShowProfile(!showProfile)} className="hover:text-black flex items-center gap-1">
            <FaUserCircle /> Profile
          </button>

          {/* Profile Popup */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-md p-4 z-50">
              <p className="font-bold text-lg mb-2">Profile</p>
              <p><span className="font-semibold">Name:</span> {user?.Name}</p>
              <p><span className="font-semibold">Email:</span> {user?.Email}</p>
              <p><span className="font-semibold">Role:</span> {user?.role}</p>
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
