const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      // type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        purchase_price: {
          type: Number,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },
    buyer_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: Object,
      reuired: true,
    },
    payment_method: {
      type: String,
      enum: ["COD", "Bkash"],
      default: "COD",
    },
    payment_status: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Processing", "Shipping", "Received"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
