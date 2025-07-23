import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurantForm = ({ onClose }) => {
  const [data, setData] = useState({ name: '', location: '', rating: '', image: '' });

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/restaurants', {
        restaurant_name: data.name,
        location: data.location,
        rating: data.rating,
        image: data.image
      }, { withCredentials: true });
      alert('Restaurant added successfully!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to add restaurant');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold">Add Restaurant</h2>
        <input name="name" placeholder="Name" value={data.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input name="location" placeholder="Location" value={data.location} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input name="rating" type="number" placeholder="Rating" value={data.rating} onChange={handleChange} className="w-full border px-3 py-2 rounded" min="0" max="5" step="0.1" required />
        <input name="image" placeholder="Image URL" value={data.image} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <div className="flex justify-between">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurantForm;
