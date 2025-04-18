// routes/adminRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token including user role
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role }); // Send role to frontend
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
