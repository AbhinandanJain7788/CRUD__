// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/authSlice";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await dispatch(loginUser(formData));
//     if (!result.error) navigate("/");
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
//         <h2 className="text-xl mb-4">Login</h2>
//         <input type="email" name="email" placeholder="Email"
//           value={formData.email} onChange={handleChange}
//           className="w-full p-2 border mb-2 rounded" required />
//         <input type="password" name="password" placeholder="Password"
//           value={formData.password} onChange={handleChange}
//           className="w-full p-2 border mb-2 rounded" required />
//         {error && <p className="text-red-500">{error}</p>}
//         <button type="submit" disabled={loading}
//           className="w-full bg-blue-500 text-white p-2 rounded">
//           {loading ? "Logging in..." : "Login"}
//         </button>
//         <p className="mt-2 text-sm">Don’t have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
//       </form>
//     </div>
//   );
// }

// src/pages/Login.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (!result.error) navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back 👋
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
