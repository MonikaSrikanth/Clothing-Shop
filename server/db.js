// db.js
require('dotenv').config();
const mongoose = require("mongoose");
const uri = process.env.URI;
console.log("Loaded URI:", process.env.URI);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;

