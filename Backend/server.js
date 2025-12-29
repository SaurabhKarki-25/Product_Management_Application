const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// ✅ CORS CONFIG
app.use(
  cors({
    origin: "http://localhost:5173", // React (Vite) frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/AuthRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/dashboard", require("./routes/DashboardRoute"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
