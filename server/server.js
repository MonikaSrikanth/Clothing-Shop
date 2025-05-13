const express = require("express");
const cors = require("cors");
require("./db"); // <-- This connects to MongoDB

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api", authRoutes);
app.use("/api/order", orderRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
