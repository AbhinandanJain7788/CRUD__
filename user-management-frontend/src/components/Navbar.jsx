import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold">
          Task Manager
        </Link>

        {/* Links */}
        <div className="flex gap-6">
          {user ? (
            <>
              <Link to="/tasks" className="hover:text-gray-200">
                My Tasks
              </Link>
              <Link to="/tasks/create" className="hover:text-gray-200">
                Create Task
              </Link>
              {user.role === "admin" && (
                <Link to="/users" className="hover:text-gray-200">
                  Manage Users
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
