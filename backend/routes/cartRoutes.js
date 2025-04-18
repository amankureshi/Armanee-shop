const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

//  Add to Cart
router.post("/add", authenticateUser, async (req, res) => {
  console.log("Received request to add cart:", req.body);
  console.log("User ID extracted from token:", req.user?.id);

  const { productId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      //  Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      //  Check if product already exists in cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already exists
      } else {
        cart.items.push({ productId, quantity: 1 }); // Add new product
      }
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ error: error.message });
  }
});

//  Get user cart (No need for userId in URL)
router.get("/items", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price image"
    );

    if (!cart) return res.status(200).json({ cart: [] }); // Return empty cart if not found

    res.status(200).json({ cart: cart.items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Remove item from cart
router.post("/remove", authenticateUser, async (req, res) => {
  //  Use POST
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // 🔹 Convert both to String before comparing
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item removed", cart: cart.items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
