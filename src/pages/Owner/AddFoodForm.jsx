import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFoodForm = ({ onClose }) => {
  const [data, setData] = useState({ name: '', description: '', price: '', type: '', image: '', restaurant: '' });
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/restaurants', { withCredentials: true })
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/foods', {
        food_name: data.name,
        description: data.description,
        price: data.price,
        food_type: data.type,
        image: data.image,
        restaurant: data.restaurant
      }, { withCredentials: true });
      alert('Food item added!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to add food');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold">Add Food Item</h2>
        <input name="name" placeholder="Food Name" value={data.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <textarea name="description" placeholder="Description" value={data.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input name="price" type="number" placeholder="Price" value={data.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input name="type" placeholder="Type (veg/non-veg)" value={data.type} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input name="image" placeholder="Image URL" value={data.image} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <select name="restaurant" value={data.restaurant} onChange={handleChange} className="w-full border px-3 py-2 rounded" required>
          <option value="">Select Restaurant</option>
          {restaurants.map(r => (
            <option key={r._id} value={r._id}>{r.restaurant_name}</option>
          ))}
        </select>
        <div className="flex justify-between">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddFoodForm;
