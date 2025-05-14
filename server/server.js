const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db"); // Connects to MongoDB

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

const app = express();

// CORS setup
const allowedOrigins = ["https://styleclothings.netlify.app"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // If you use cookies or tokens in headers
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/order", orderRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
