// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);

//  useEffect(() => {
//   const fetchAllUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/users", {
//   withCredentials: true,
// });

//       if (Array.isArray(res.data)) {
//         setUsers(res.data);
//       } else {
//         console.error("Unexpected response:", res.data);
//         setUsers([]);
//       }
//     } catch (err) {
//       console.error("Error fetching users", err);
//       setUsers([]);
//     }
//   };
//   fetchAllUsers();
// }, []);


//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">All Registered Users</h2>

//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border-collapse">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700 text-left">
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Phone</th>
//                 <th className="p-3">Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//   <div
//     key={user._id}
//     className="flex justify-between items-center bg-white p-4 mb-2 shadow rounded"
//   >
//     <div>
//       <p><strong>Name:</strong> {user.Name}</p>
//       <p><strong>Email:</strong> {user.Email}</p>
//       <p><strong>Phone:</strong> {user.MobileNo}</p>
//       <p><strong>Role:</strong> {user.role}</p>
//     </div>

//     <button
//       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//       onClick={() => handleDelete(user._id)}
//     >
//       Delete
//     </button>
//   </div>
// ))}

//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          withCredentials: true,
        });

        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users", err);
        setUsers([]);
      }
    };
    fetchAllUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${userId}`, {
        withCredentials: true,
      });

      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          All Registered Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200 text-yellow-500">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
             {users
  .filter((user) => user.role === "user")
  .map((user) => (
    <tr key={user._id} className="hover:bg-gray-100">
      <td className="p-3 border">{user.Name}</td>
      <td className="p-3 border">{user.Email}</td>
      <td className="p-3 border">{user.MobileNo}</td>
      <td className="p-3 border">{user.role}</td>
      <td className="p-3 border">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => handleDelete(user._id)}
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

export default AdminUsers;
