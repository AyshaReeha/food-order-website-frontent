import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOwners = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          withCredentials: true,
        });

        if (Array.isArray(res.data)) {
          setOwners(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setOwners([]);
        }
      } catch (err) {
        console.error("Error fetching owners", err);
        setOwners([]);
      }
    };
    fetchOwners();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this owner?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
        withCredentials: true,
      });
      setOwners((prev) => prev.filter((owner) => owner._id !== id));
    } catch (err) {
      console.error("Error deleting owner", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">All Restaurant Owners</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {owners
                .filter((owner) => owner.role === "owner")
                .map((owner) => (
                  <tr key={owner._id} className="hover:bg-gray-100 text-center">
                    <td className="p-3 border">{owner.Name}</td>
                    <td className="p-3 border">{owner.Email}</td>
                    <td className="p-3 border">{owner.MobileNo}</td>
                    <td className="p-3 border">{owner.role}</td>
                    <td className="p-3 border">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(owner._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOwners;
