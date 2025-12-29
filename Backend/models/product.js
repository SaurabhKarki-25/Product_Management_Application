const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Brand_Name:{
      type: String,
      required: true,

    },

    Item_name: {
      type: String,
      required: true,
      trim: true
    },

    stock: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["available", "unavailable"],
      required: true
    },

    price : {
      type: Number,
      required: true,
    },

  

    updatedByRole: {
      type: String,
      enum: ["admin", "manager"]
    },

    updatedByEmail: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
