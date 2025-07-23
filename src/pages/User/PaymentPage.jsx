import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cartTotal, setCartTotal] = useState(0);

  const navigate = useNavigate();
  

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id || user?.id;

 useEffect(() => {
  if (!userId) return; // Wait until userId is available

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
        withCredentials: true,
      });
      setCartTotal(res.data.totalAmount || 0);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  fetchCart();
}, [userId]);

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

 const handlePayment = async () => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Failed to load Razorpay SDK");
    return;
  }

  // Create order on backend
  const result = await axios.post("http://localhost:5000/api/payments/create-order", {

    amount: cartTotal,
  });

  const { amount, id: order_id, currency } = result.data;

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Public Razorpay Key
    amount: amount.toString(),
    currency: currency,
    name: "FoodOrder App",
    description: "Order Payment",
    image: "/logo.png",
    order_id: order_id,
    handler: async function (response) {
      alert("Payment successful!");
      navigate("/order-summary");
    },
    prefill: {
      name: "Your Name",
      email: "you@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "RIT Campus",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const razor = new window.Razorpay(options);
  razor.open();
};


  return (
   <div className="min-h-screen bg-gray-100 flex justify-center items-start p-8">
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
    <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>

    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-2">Select Payment Method:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border w-full p-2"
        >
          <option value="upi">UPI</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>

      {method === "upi" && (
        <div>
          <label className="block mb-2">Enter UPI ID:</label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="example@upi"
            className="border p-2 w-full"
            required
          />
        </div>
      )}

      <div className="mt-4 bg-gray-50 p-4 rounded border">
        <p className="text-gray-700">
          <strong>Total Amount:</strong> ₹{cartTotal}
        </p>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4"
      >
        Pay with Razorpay
      </button>
    </div>
  </div>
</div>

  );
};

export default PaymentPage;
