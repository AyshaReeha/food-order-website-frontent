
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(40);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id || user?.id;


  useEffect(() => {
    if (!userId) {
      console.log("User not logged in");
      navigate("/signup");
    } else {
      fetchCart();
    }
  }, []);
  const handleCheckout = () => {
  navigate("/checkout/delivery"); // replace "/checkout" with your route
};


  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(response.data);

      const calculatedTotal = response.data.items.reduce(
        (acc, item) => acc + item.food.price * item.quantity,
        0
      );
      setTotal(calculatedTotal);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (foodId, newQty) => {
    if (newQty < 1) return;
    try {
      await axios.post("http://localhost:5000/api/cart/update-quantity",
  { foodId, quantity: newQty },
  { withCredentials: true }
);

      fetchCart();
    } catch (err) {
      console.error("Error updating quantity", err);
    }
  };

  const handleRemove = async (foodId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item?");
    if (!confirmDelete) return;

    try {
      await axios.post("http://localhost:5000/api/cart/remove",
  { foodId },
  { withCredentials: true }
);

      fetchCart();
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  const subtotal = total + deliveryCharge;

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart?.items?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.food._id}
                className="flex items-center border p-4 rounded-lg shadow-sm"
              >
                <img
                  src={item.food.image}
                  alt={item.food.name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.food.name}</h2>
                  <p className="text-sm text-gray-600">₹{item.food.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.food._id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.food._id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm text-gray-800 font-semibold">
                    ₹{item.food.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemove(item.food._id)}
                    className="text-red-500 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border p-4 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Item Total</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
            <button  onClick={handleCheckout}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
