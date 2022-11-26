const Order = require("../models/orderSchema");

//CREATE
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const updateOrder = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide a _id" });
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.query._id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteOrder = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide a _id" });
  try {
    await Order.findByIdAndDelete(req.query._id);
    res.status(200).json({ msg: "Order has been deleted.." });
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET BY ID // it will take user id
const getOrderByUserId = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide a user _id" });

  try {
    const forders = await Order.find({ userId: req.query._id }).populate(
      "products.productId"
    );
    // console.log(forders);
    res.status(200).json(forders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// populate(
//   "products.productId"
// );

//Order All
const getAllOrders = async (req, res) => {
  const qpage = req.query.page || 0;
  const qlimit = req.query.limit || 30;
  try {
    let forders;

    forders = await Order.find()
      .populate("products.productId")
      .populate("userId")
      .sort({ createdAt: -1 })
      .skip(qpage * qlimit)
      .limit(qlimit);

    res.status(200).json(forders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Order STATS
const getOrderStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByUserId,
  getAllOrders,
  getOrderStats,
};
