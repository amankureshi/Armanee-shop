const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // ✅ Add this line
});

module.exports = mongoose.model("User", userSchema);
