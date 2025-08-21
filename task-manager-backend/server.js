
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");
// require("dotenv").config();

// const app = express();

// // ✅ Allowed frontend origins
// const allowed = [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean);
// app.use(cors({
//   origin: (origin, cb) => {
//     if (!origin || allowed.includes(origin)) cb(null, true);
//     else cb(new Error("CORS not allowed"));
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(express.json());

// // ✅ Ensure uploads folder exists (for Render disk)
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/tasks", require("./routes/taskRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));

// // ✅ Serve uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // DB connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
//   })
//   .catch(err => console.error("MongoDB connection error:", err));

//   console.log(process.env.MONGO_URI)


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// ✅ Allow all origins (fix CORS issue for Render + Vercel)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// ✅ Ensure uploads folder exists (for local dev / Render disk)
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// ✅ Serve uploaded files (only if using local disk storage)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
