const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { 
    type: String, // Store user's name instead of ObjectId
    required: true
  },
  items: { 
    type: Array, 
    required: true 
  },
  totalPrice: { 
    type: Number, 
    required: true 
  },
  placedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Order", orderSchema);
