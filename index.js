const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const orderRoute = require("./routes/orderRoute");
const cartRoute = require("./routes/cartRoute");
const reviewRoute = require("./routes/reviewRoute");
const discountRoute = require("./routes/discountRoute");

mongoose
  .connect(
    `mongodb+srv://adminEcom:${process.env.DB_PASS}@cluster0.3itedvz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("database connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/review", reviewRoute);
app.use("/api/discount", discountRoute);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to aleeha-single-vendor-ecom" });
});

app.listen(PORT, () => {
  console.log("Server is running on port.." + PORT);
});
