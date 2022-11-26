const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      require: true,
    },
    gallary_img: {
      type: Array,
    },
    unit_price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    specification: [
      {
        key: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    mcq: {
      type: Number,
      default: 1,
    },
    categories: {
      type: Array,
    },
    stock: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
