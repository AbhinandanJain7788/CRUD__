// // src/pages/TaskEdit.jsx
// import { useEffect, useState } from "react";
// import API from "../api/axios.js";
// import { useParams, useNavigate, Link } from "react-router-dom";

// export default function TaskEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     status: "pending",
//     priority: "medium",
//     dueDate: ""
//   });
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch existing task
//   useEffect(() => {
//     API.get(`/tasks/${id}`)
//       .then((res) => {
//         setFormData({
//           title: res.data.title,
//           description: res.data.description || "",
//           status: res.data.status,
//           priority: res.data.priority,
//           dueDate: res.data.dueDate ? res.data.dueDate.split("T")[0] : ""
//         });
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [id]);

//   // handle input change
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // handle form submit (PUT request)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//     for (let f of files) data.append("documents", f);

//     try {
//       await API.put(`/tasks/${id}`, data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       navigate("/tasks");
//     } catch (err) {
//       console.error("Error updating task:", err.response?.data || err.message);
//     }
//   };

//   if (loading) return <p className="p-6">Loading task...</p>;

//   return (
//     <div className="p-6">
//       <Link to="/tasks" className="text-blue-500">← Back</Link>
//       <h2 className="text-xl font-bold mb-4">Edit Task</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-96">
//         <input name="title" placeholder="Title" value={formData.title}
//           onChange={handleChange} className="border p-2 rounded" required />
//         <textarea name="description" placeholder="Description"
//           value={formData.description} onChange={handleChange}
//           className="border p-2 rounded" />
//         <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded">
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//         <select name="priority" value={formData.priority} onChange={handleChange} className="border p-2 rounded">
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//         <input type="date" name="dueDate" value={formData.dueDate}
//           onChange={handleChange} className="border p-2 rounded" />

//         <input type="file" multiple accept="application/pdf"
//           onChange={(e) => setFiles(e.target.files)} />
//         <button type="submit" className="bg-green-500 text-white p-2 rounded">Update Task</button>
//       </form>
//     </div>
//   );
// }


// src/pages/TaskEdit.jsx



// src/pages/TaskEdit.jsx
import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch existing task
  useEffect(() => {
    API.get(`/tasks/${id}`)
      .then((res) => {
        setFormData({
          title: res.data.title,
          description: res.data.description || "",
          status: res.data.status,
          priority: res.data.priority,
          dueDate: res.data.dueDate ? res.data.dueDate.split("T")[0] : "",
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Submit updated task
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    for (let f of files) data.append("documents", f);

    try {
      await API.put(`/tasks/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/tasks");
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
    }
  };

  if (loading) return <p className="p-6 text-gray-600">Loading task...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">✏️ Edit Task</h1>
        <Link
          to="/tasks"
          className="text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← Back to Tasks
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-5 max-w-3xl border border-gray-200"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded h-28 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Status + Priority + Due Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Upload Documents
          </label>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => setFiles(e.target.files)}
            className="w-full border p-2 rounded bg-gray-50"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow transition"
          >
            ✅ Update Task
          </button>
        </div>
      </form>
    </div>
  );
}
