const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect DB (non-blocking)
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
  })
);

// Routes
app.use("/api/auth", require("./routes/AuthRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/dashboard", require("./routes/DashboardRoute"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
