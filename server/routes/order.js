const express = require("express");
const Order = require("../models/order");
const router = express.Router();
const authenticateUser = require("../middleware/auth"); // Correct import of authenticateUser

// POST route for placing an order
router.post("/place", authenticateUser, async (req, res) => {
  const { items, totalPrice } = req.body;
  const user = req.user; // user will be added to the request object by the authenticateUser middleware
  if (!user) {
    return res.status(401).json({ message: "User not found or invalid" });
  }

  if (!items || !totalPrice) {
    return res.status(400).json({ message: "Missing order data" });
  }

  try {
    // Create a new order with user ID and order details
    const newOrder = new Order({
      user: user.name, // Link the order to the authenticated user
      items,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: savedOrder._id,
    });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

module.exports = router;
