// // src/pages/Dashboard.jsx
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../redux/authSlice.js";

// export default function Dashboard() {
//   const dispatch = useDispatch();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-96 text-center">
//         <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
//         <nav className="flex flex-col gap-2">
//           <Link to="/tasks" className="bg-blue-500 text-white p-2 rounded">My Tasks</Link>
//           <Link to="/users" className="bg-green-500 text-white p-2 rounded">User Management (Admin)</Link>
//           <button 
//             onClick={() => dispatch(logout())}
//             className="bg-red-500 text-white p-2 rounded"
//           >
//             Logout
//           </button>
//         </nav>
//       </div>
//     </div>
//   );
// }

// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice.js";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.role === "admin" ? "Admin" : "User"} 👋
        </h1>
        <button
          onClick={() => dispatch(logout())}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* My Tasks Card */}
        <Link
          to="/tasks"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📋 My Tasks</h2>
          <p className="text-gray-600">View and manage all your tasks easily.</p>
        </Link>

        {/* Create Task Card */}
        <Link
          to="/tasks/create"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">➕ Create Task</h2>
          <p className="text-gray-600">Add a new task with details and documents.</p>
        </Link>

        {/* Admin Only Card */}
        {user?.role === "admin" && (
          <Link
            to="/users"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">👥 User Management</h2>
            <p className="text-gray-600">Manage users and their roles (Admin only).</p>
          </Link>
        )}
      </div>
    </div>
  );
}
