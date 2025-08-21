const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

// Admin check middleware
function isAdmin(req, res, next) {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
}

// Get all users (Admin only)
router.get("/", auth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update user (Admin only)
router.put("/:id", auth, isAdmin, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// Delete user (Admin only)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
