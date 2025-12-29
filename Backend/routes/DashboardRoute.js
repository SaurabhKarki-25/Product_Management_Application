const express = require("express");
const Product = require("../models/product");
const auth = require("../middleware/authmiddleware");
const allowEmail = require("../middleware/allowedEmails");

const router = express.Router();


//stats route 
router.get("/stats", auth, allowEmail, async (req, res) => {
  try {
    const total = await Product.countDocuments();
    const available = await Product.countDocuments({ status: "available" });
    const unavailable = await Product.countDocuments({ status: "unavailable" });

    res.json({
      totalProducts: total,
      availableProducts: available,
      unavailableProducts: unavailable
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
