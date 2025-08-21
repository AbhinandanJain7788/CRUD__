// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../redux/authSlice";
// import { Link, useNavigate } from "react-router-dom";

// export default function Register() {
//   const [formData, setFormData] = useState({ email: "", password: "", role: "user" });
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await dispatch(registerUser(formData));
//     if (!result.error) navigate("/login");
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
//         <h2 className="text-xl mb-4">Register</h2>
//         <input type="email" name="email" placeholder="Email"
//           value={formData.email} onChange={handleChange}
//           className="w-full p-2 border mb-2 rounded" required />
//         <input type="password" name="password" placeholder="Password"
//           value={formData.password} onChange={handleChange}
//           className="w-full p-2 border mb-2 rounded" required />
//         <select name="role" value={formData.role} onChange={handleChange}
//           className="w-full p-2 border mb-2 rounded">
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//         {error && <p className="text-red-500">{error}</p>}
//         <button type="submit" disabled={loading}
//           className="w-full bg-blue-500 text-white p-2 rounded">
//           {loading ? "Registering..." : "Register"}
//         </button>
//         <p className="mt-2 text-sm">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
//       </form>
//     </div>
//   );
// }

// src/pages/Register.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ email: "", password: "", role: "user" });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (!result.error) navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create an Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

