const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  rating: {
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Product", ProductSchema);
