// db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://monikasrikanth03:Monika03@cluster1.njwzmex.mongodb.net/clothing-shop?retryWrites=true&w=majority&appName=Cluster1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;

