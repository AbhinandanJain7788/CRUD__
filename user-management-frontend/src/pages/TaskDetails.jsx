






// import { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";   // ✅ to get logged in user
// import API from "../api/axios.js";

// export default function TaskDetails() {
//   const { id } = useParams();
//   const [task, setTask] = useState(null);
//   const navigate = useNavigate();

//   // ✅ get user info from Redux (decoded from token in authSlice)
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     API.get(`/tasks/${id}`)
//       .then((res) => setTask(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this task?")) return;
//     try {
//       await API.delete(`/tasks/${id}`);
//       navigate("/tasks"); // redirect back to task list
//     } catch (err) {
//       console.error("Error deleting task:", err.response?.data || err.message);
//     }
//   };

//   if (!task) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6">
//       <Link to="/tasks" className="text-blue-500">← Back</Link>
//       <h2 className="text-2xl font-bold mt-2">{task.title}</h2>
//       <p>{task.description}</p>
//       <p>Status: {task.status}</p>
//       <p>Priority: {task.priority}</p>
//       <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>

//       {/* ✅ Show buttons ONLY if current user owns the task */}
//       {user?.id === task.assignedTo?._id && (
//         <div className="flex gap-2 mt-4">
//           <Link to={`/tasks/${task._id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded">
//             Edit Task
//           </Link>
//           <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
//             Delete Task
//           </button>
//         </div>
//       )}

//       {/* Documents */}
//       <h3 className="font-bold mt-4">Documents</h3>
//       {task.documents?.length > 0 ? (
//         <ul className="list-disc pl-6">
//           {task.documents.map((doc, idx) => (
//             <li key={idx}>
//               <a
//                 href={`http://localhost:5000/${doc}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600"
//               >
//                 Document {idx + 1}
//               </a>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No documents</p>
//       )}
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../api/axios.js";

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    API.get(`/tasks/${id}`)
      .then((res) => setTask(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      navigate("/tasks");
    } catch (err) {
      console.error("Error deleting task:", err.response?.data || err.message);
    }
  };

  if (!task) return <p className="p-6 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/tasks"
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          ← Back to Tasks
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Task Details
        </h1>
      </div>

      {/* Main content */}
      <div className="space-y-6">
        {/* Task Info */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {task.title}
          </h2>
          <p className="text-gray-700">{task.description}</p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <p
              className={`mt-1 font-medium ${
                task.status === "completed"
                  ? "text-green-600"
                  : task.status === "in-progress"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {task.status}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Priority</p>
            <p
              className={`mt-1 font-medium ${
                task.priority === "high"
                  ? "text-red-600"
                  : task.priority === "medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {task.priority}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Due Date</p>
            <p className="mt-1 font-medium text-gray-800">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Action buttons (only if owner) */}
        {user?.id === task.assignedTo?._id && (
          <div className="flex gap-4">
            <Link
              to={`/tasks/${task._id}/edit`}
              className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow transition"
            >
              ✏️ Edit Task
            </Link>
            <button
              onClick={handleDelete}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow transition"
            >
              🗑️ Delete Task
            </button>
          </div>
        )}

        {/* Documents */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📂 Attached Documents
          </h3>
          {task.documents?.length > 0 ? (
            <ul className="space-y-2">
              {task.documents.map((doc, idx) => (
                <li key={idx}>
                  <a
                    href={`http://localhost:5000/${doc}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Document {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No documents uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
}
