// // src/pages/TaskCreate.jsx
// import { useState } from "react";
// import API from "../api/axios.js";
// import { useNavigate } from "react-router-dom";

// export default function TaskCreate() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     status: "pending",
//     priority: "medium",
//     dueDate: ""
//   });
//   const [files, setFiles] = useState([]);
//   const navigate = useNavigate();

//   // handle input change
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//     for (let f of files) data.append("documents", f);

//     try {
//       await API.post("/tasks", data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       navigate("/tasks"); // redirect back to task list
//     } catch (err) {
//       console.error("Error creating task:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Create Task</h2>
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
//         <input type="text" name="assignedTo" placeholder="Assign to UserId"
//           value={formData.assignedTo} onChange={handleChange}
//           className="border p-2 rounded" />
//         <input type="file" multiple accept="application/pdf"
//           onChange={(e) => setFiles(e.target.files)} />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Task</button>
//       </form>
//     </div>
//   );
// }

// src/pages/TaskCreate.jsx





// src/pages/TaskCreate.jsx
import { useState } from "react";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function TaskCreate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: ""
  });
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    for (let f of files) data.append("documents", f);

    try {
      await API.post("/tasks", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/tasks"); // redirect back to task list
    } catch (err) {
      console.error("Error creating task:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Create New Task 📝</h2>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Title</label>
          <input
            name="title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Enter task details"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            rows="5"
          />
        </div>

        {/* Status + Priority (side by side on large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Attach Documents (PDF only, multiple allowed)
          </label>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => setFiles(e.target.files)}
            className="w-full"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
