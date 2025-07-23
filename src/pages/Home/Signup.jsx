
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import foodImage from "../../assets/food.jpg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const toggleMode = () => setIsLogin((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    const payload = isLogin
      ? { Email: email, Password: password }
      : { Name: name, Email: email, MobileNo: phone, role, Password: password };

    try {
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (res.ok) {
        console.log("User data from backend:", data.user); // 🔍 log before saving
         localStorage.setItem("user", JSON.stringify(data.user));


        // Debug check
        const storedUser = JSON.parse(localStorage.getItem("user"));
        console.log("Saved in localStorage:", storedUser);


        const userRole = data.user.role;
        if (userRole === "admin") navigate("/admin");
        else if (userRole === "owner") navigate("/owner");
        else if (userRole === "user") navigate("/home");
        else navigate("/"); 
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

// const AuthPage = () => {
//   const [formData, setFormData] = useState({
//     Name: "",
//     Email: "",
//     Password: "",
//     MobileNo: "",
//     role: "user", // default role
//   });
//   const [isLogin, setIsLogin] = useState(false);
//   const navigate = useNavigate();

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = isLogin
//       ? "http://localhost:5000/api/users/login"
//       : "http://localhost:5000/api/users/signup";

//     try {
//       const response = await axios.post(endpoint, formData);
//       console.log("Login/Signup Response:", response.data);

//       if (response.data.success) {
//         const userFromBackend = response.data.user;
//         const normalizedUser = {
//           ...userFromBackend,
//           _id: userFromBackend._id || userFromBackend.id, // ✅ ensure _id exists
//         };

//         localStorage.setItem("user", JSON.stringify(normalizedUser));
//         console.log("User saved in localStorage:", normalizedUser);

//         // Redirect based on role
//         if (normalizedUser.role === "admin") {
//           navigate("/admin");
//         } else if (normalizedUser.role === "owner") {
//           navigate("/owner");
//         } else {
//           navigate("/home");
//         }
//       } else {
//         alert(response.data.message || "Authentication failed.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong!");
//     }
//   };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex h-screen items-center justify-center">
        <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Food Xpress</h2>
            <h3 className="text-xl font-semibold mb-6">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h3>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="John Doe"
                  />
                </div>
               


              )}

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="example@mail.com"
                />
              </div>

              {!isLogin && (
                <div className="flex gap-4 mb-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="9876543210"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 mb-1">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md"
                    >
                      <option value="user">User</option>
                      {/* <option value="admin">Admin</option> */}
                      <option value="owner">Owner</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="••••••••"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-green-600 hover:underline font-medium"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          <div className="hidden md:block md:w-1/2">
            <img
              src={foodImage}
              alt="Food"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
