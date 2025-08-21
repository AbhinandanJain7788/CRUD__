// // src/pages/TaskList.jsx
// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { Link } from "react-router-dom";

// export default function TaskList() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     try {
//       const res = await API.get("/tasks");
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading tasks...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">My Tasks</h2>
//       <Link to="/tasks/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">+ Create Task</Link>
//       <div className="grid gap-4">
//         {tasks.map((task) => (
//           <Link key={task._id} to={`/tasks/${task._id}`} className="border p-4 rounded bg-white hover:shadow">
//             <h3 className="font-bold">{task.title}</h3>
//             <p>Status: {task.status} | Priority: {task.priority}</p>
//             <p className="text-sm text-gray-600">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }


// src/pages/TaskList.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading tasks...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📋 My Tasks</h2>
        <Link
          to="/tasks/create"
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition"
        >
          + Create Task
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Priority</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Due Date</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, idx) => (
                <tr
                  key={task._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{task.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/tasks/${task._id}`}
                      className="text-blue-500 hover:underline font-medium"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No tasks found. Create one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

