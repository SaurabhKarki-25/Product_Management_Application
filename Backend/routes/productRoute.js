const express = require("express");
const Product = require("../models/product");
const auth = require("../middleware/authmiddleware");
const allowEmail = require("../middleware/allowedEmails");

const router = express.Router();

//add product route

router.post("/", auth, allowEmail, async (req, res) => {
  try {
    const {
      Brand_Name,
      Item_name,
      stock,
      status,
      price
    } = req.body;

    //  Correct validation according to schema
    if (
      !Brand_Name ||
      !Item_name ||
      stock === undefined ||
      stock < 0 ||
      !status ||
      !price
    ) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const product = await Product.create({
      Brand_Name,
      Item_name,
      stock,
      status,
      price,
      updatedByRole: req.user.role,
      updatedByEmail: req.user.email
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// get all product route 

router.get("/", auth, allowEmail, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// update product route 

router.put("/:id", auth, allowEmail, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedByRole: req.user.role,
        updatedByEmail: req.user.email
      },
      { new: true }
    );

    res.json(updatedProduct);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete product route 

router.delete("/:id", auth, allowEmail, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

