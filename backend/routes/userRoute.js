const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authenticateUser } = require("../middleware/authMiddleware");
const router = express.Router();

//  Get all users
router.get("/", authenticateUser, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get a single user by ID
// Add your other routes here

module.exports = router;
