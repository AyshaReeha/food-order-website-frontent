// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const DeliveryDetails = () => {
// //     const [showPopup, setShowPopup] = useState(false);

// //   const [formData, setFormData] = useState({
// //     companyName: "",
// //     name: "",
// //     phone: "",
// //     pincode: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //   });

// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();

// // //     // You can add form validation or API integration here
// // //     console.log("Delivery details submitted:", formData);

// // //     // Navigate to payment page
// // //     navigate("/payment");
// // //   };
// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   try {
// //     // Call your backend API to store order/delivery details here
// //     await fetch("http://localhost:5000/api/orders/place", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${localStorage.getItem("token")}`, // if protected
// //       },
// //       body: JSON.stringify(formData),
// //     });

// //     // Show confirmation popup
// //     setShowPopup(true);
// //   } catch (err) {
// //     console.error("Order placement failed:", err);
// //   }
// // };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex justify-center items-start p-8">
// //       <div className="bg-white w-full max-w-2xl rounded-lg shadow p-6">
// //         <h2 className="text-2xl font-semibold mb-6">Add Shipping Address</h2>
// //         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
// //           {/* <div className="col-span-2">
// //             <label className="block text-gray-700 mb-1">Company Name (Optional)</label>
// //             <input
// //               type="text"
// //               name="companyName"
// //               placeholder="Company's Name"
// //               className="border p-2 w-full"
// //               onChange={handleChange}
// //             />
// //           </div> */}

// //           <div>
// //             <label className="block text-gray-700 mb-1">Full Name</label>
// //             <input
// //               type="text"
// //               name="name"
// //               placeholder="Name"
// //               className="border p-2 w-full"
// //               required
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 mb-1">Phone Number</label>
// //             <input
// //               type="text"
// //               name="phone"
// //               placeholder="Phone Number"
// //               className="border p-2 w-full"
// //               required
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 mb-1">Pincode</label>
// //             <input
// //               type="text"
// //               name="pincode"
// //               placeholder="Pincode"
// //               className="border p-2 w-full"
// //               required
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div className="col-span-2">
// //             <label className="block text-gray-700 mb-1">Address</label>
// //             <input
// //               type="text"
// //               name="address"
// //               placeholder="Area and Street"
// //               className="border p-2 w-full"
// //               required
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 mb-1">City / District / Town</label>
// //             <input
// //               type="text"
// //               name="city"
// //               placeholder="City/District/Town"
// //               className="border p-2 w-full"
// //               required
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 mb-1">State</label>
// //             <input
// //               type="text"
// //               name="state"
// //               placeholder="State"
// //               className="border p-2 w-full"
// //               required
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div className="col-span-2 mt-4">
// //             <button
// //               type="submit"
// //               className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
// //             >
// //               Continue to Payment
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DeliveryDetails;
// import React, { useState } from "react";

// const DeliveryDetails = () => {
//   const [formData, setFormData] = useState({});
//   const [showPopup, setShowPopup] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate order placement logic
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center items-start p-8 relative">
//       <div className="bg-white w-full max-w-2xl rounded-lg shadow p-6">
//         <h2 className="text-2xl font-semibold mb-6">Add Shipping Address</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="border p-2 w-full"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Phone Number</label>
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               className="border p-2 w-full"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Pincode</label>
//             <input
//               type="text"
//               name="pincode"
//               placeholder="Pincode"
//               className="border p-2 w-full"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div className="col-span-2">
//             <label className="block text-gray-700 mb-1">Address</label>
//             <input
//               type="text"
//               name="address"
//               placeholder="Area and Street"
//               className="border p-2 w-full"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">City / District / Town</label>
//             <input
//               type="text"
//               name="city"
//               placeholder="City/District/Town"
//               className="border p-2 w-full"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">State</label>
//             <input
//               type="text"
//               name="state"
//               placeholder="State"
//               className="border p-2 w-full"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div className="col-span-2 mt-4">
//             <button
//               type="submit"
//               className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
//             >
//               Continue
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Popup */}
//       {showPopup && (
//         <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-10">
//           <div className="bg-white w-80 p-6 rounded-lg shadow-lg text-center relative">
//             <button
//               onClick={closePopup}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               ✕
//             </button>
//             <h3 className="text-xl font-semibold mb-2">Order Placed Successfully!</h3>
//             <p className="text-gray-600">Thank you for your order.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeliveryDetails;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const DeliveryDetails = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const [cartData, setCartData] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Get cart
// const storedUser = JSON.parse(localStorage.getItem("user"));
// const userId = storedUser?.id || storedUser?._id;


// useEffect(() => {
//   const fetchCart = async () => {
//     try {
//       if (!userId) {
//         console.error("User not found in localStorage");
//         return;
//       }

//       const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
//       setCartData(res.data);
//     } catch (error) {
//       console.error("Failed to fetch cart", error);
//     }
//   };
//   fetchCart();
// }, []);


//   // Handle form input
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submit order
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (!cartData || !cartData.items || cartData.items.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }

//     const deliveryAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

//     try {
//       const orderPromises = cartData.items.map((item) => {
//         const orderData = {
//           user: userId,
//           food: item.food._id,
//           restaurant: item.food.restaurant._id,
//           quantity: item.quantity,
//           amount: item.food.price * item.quantity,
//           delivery_address: deliveryAddress,
//         };
//         return axios.post("http://localhost:5000/api/orders", orderData);
//       });

//       await Promise.all(orderPromises);

//       // Optional: clear the cart after order
//       await axios.delete(`http://localhost:5000/api/cart/${storedUser._id}`);

//       setShowModal(true);
//     } catch (error) {
//       console.error("Order placement failed", error);
//       alert("Failed to place order. Try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
//           Delivery Details
//         </h2>
//         {["name", "phone", "address", "city", "state", "pincode"].map((field) => (
//           <input
//             key={field}
//             type={field === "phone" || field === "pincode" ? "number" : "text"}
//             name={field}
//             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             value={formData[field]}
//             onChange={handleChange}
//             className="w-full p-3 mb-4 border rounded"
//             required
//           />
//         ))}

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition duration-300"
//         >
//           Place Order
//         </button>
//       </form>

//       {/* Order Placed Modal */}
//       {showModal && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded shadow text-center w-96">
//             <h2 className="text-xl font-bold mb-4">Order Placed Successfully!</h2>
//             <p className="mb-4">
//               Thank you for your purchase. Your order is being processed.
//             </p>
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => {
//                 setShowModal(false);
//                 navigate("/home");
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeliveryDetails;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const DeliveryDetails = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const [showPopup, setShowPopup] = useState(false);
//   const [cartData, setCartData] = useState(null);

//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const userId = storedUser?.id || storedUser?._id;

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!userId) {
//         console.error("User not found in localStorage");
//         return;
//       }

//       try {
//         const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
//         setCartData(res.data);
//       } catch (err) {
//         console.error("Failed to fetch cart", err);
//       }
//     };

//     fetchCart();
//   }, [userId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!cartData || !cartData.items || cartData.items.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }

//     try {
//       // Send orders (optional)
//       const deliveryAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
//       const orderRequests = cartData.items.map((item) => ({
//         user: userId,
//         food: item.food._id,
//         restaurant: item.food.restaurant._id,
//         quantity: item.quantity,
//         amount: item.food.price * item.quantity,
//         delivery_address: deliveryAddress,
//       }));

//       await Promise.all(
//         orderRequests.map((data) =>
//           axios.post("http://localhost:5000/api/orders", data)
//         )
//       );

//       // Optionally clear cart
//       await axios.delete(`http://localhost:5000/api/cart/${userId}`);

//       setShowPopup(true);
//     } catch (err) {
//       console.error("Order placement failed:", err);
//       alert("Something went wrong. Try again.");
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     navigate("/home");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
//           Delivery Details
//         </h2>
//         {["name", "phone", "address", "city", "state", "pincode"].map((field) => (
//           <input
//             key={field}
//             type={field === "phone" || field === "pincode" ? "number" : "text"}
//             name={field}
//             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             value={formData[field]}
//             onChange={handleChange}
//             className="w-full p-3 mb-4 border rounded"
//             required
//           />
//         ))}
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition duration-300"
//         >
//           Place Order
//         </button>
//       </form>

//       {/* Order Placed Popup */}
//       {showPopup && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
//           <div className="bg-white rounded-lg shadow-lg p-6 text-center w-80">
//             <h2 className="text-xl font-semibold mb-2 text-green-700">Order Placed</h2>
//             <p className="text-gray-600 mb-4">Thank you! Your order is being processed.</p>
//             <button
//               onClick={closePopup}
//               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeliveryDetails;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryDetails = () => {
  const [formData, setFormData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // 👈 Add navigate hook

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement logic
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/home"); // 👈 Navigate to home
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-8 relative">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Add Shipping Address</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-2 w-full"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="border p-2 w-full"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="border p-2 w-full"
              required
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Area and Street"
              className="border p-2 w-full"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">City / District / Town</label>
            <input
              type="text"
              name="city"
              placeholder="City/District/Town"
              className="border p-2 w-full"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              className="border p-2 w-full"
              required
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        </form>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-10">
          <div className="bg-white w-80 p-6 rounded-lg shadow-lg text-center relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-2">Order Placed Successfully!</h3>
            <p className="text-gray-600">Thank you for your order.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryDetails;
