const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

//  Save contact message
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, message } = req.body;

    if (!firstName || !lastName || !email || !mobileNumber || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      mobileNumber,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get all contact messages (Admin use)
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
