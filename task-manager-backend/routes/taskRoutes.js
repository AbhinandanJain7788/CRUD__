const express = require("express");
const multer = require("multer");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

// File storage config
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { files: 3 }, // max 3 files
  fileFilter: function(req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDFs allowed"));
    }
    cb(null, true);
  }
});

// CREATE Task
router.post("/", auth, upload.array("documents", 3), async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    const files = req.files ? req.files.map(f => f.path) : [];

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo: req.user.id,
      documents: files
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all tasks (with filtering/sorting/pagination)
// router.get("/", auth, async (req, res) => {
//   try {
//     const { status, priority, sortBy, page = 1, limit = 5 } = req.query;

//     let query = {};
//     if (status) query.status = status;
//     if (priority) query.priority = priority;

//     const tasks = await Task.find(query)
//       .sort(sortBy ? { [sortBy]: 1 } : {})
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit))
//       .populate("assignedTo", "email role");

//     res.json(tasks);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
router.get("/", auth, async (req, res) => {
    try {
      const { status, priority, sortBy, page = 1, limit = 5 } = req.query;
  
      let query = {};
      if (status) query.status = status;
      if (priority) query.priority = priority;
  
      // 👇 if not admin, only fetch their tasks
      if (req.user.role !== "admin") {
        query.assignedTo = req.user.id;
      }
  
      const tasks = await Task.find(query)
        .sort(sortBy ? { [sortBy]: 1 } : {})
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("assignedTo", "email role");
  
      res.json(tasks);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// READ single task
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("assignedTo", "email role");
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE task
// router.put("/:id", auth, upload.array("documents", 3), async (req, res) => {
//   try {
//     const updates = req.body;
//     if (req.files.length > 0) {
//       updates.documents = req.files.map(f => f.path);
//     }

//     const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
//     res.json(task);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

router.put("/:id", auth, upload.array("documents", 3), async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ error: "Task not found" });
  
      // Only task owner can update
      if (task.assignedTo.toString() !== req.user.id) {
        return res.status(403).json({ error: "Not allowed" });
      }
  
      const updates = req.body;
      if (req.files.length > 0) {
        updates.documents = req.files.map(f => f.path);
      }
  
      const updated = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// DELETE task
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     await Task.findByIdAndDelete(req.params.id);
//     res.json({ message: "Task deleted" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
router.delete("/:id", auth, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ error: "Task not found" });
  
      // Only task owner can delete
      if (task.assignedTo.toString() !== req.user.id) {
        return res.status(403).json({ error: "Not allowed" });
      }
  
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: "Task deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;
