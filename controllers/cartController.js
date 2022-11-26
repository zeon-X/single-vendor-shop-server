const Cart = require("../models/cartSchema");

//CREATE
const createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const updateCart = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an cart _id" });
  if (!req.query.userId) res.status(500).json({ msg: "provide an user id" });
  try {
    const savedCart = await Cart.findById(req.query._id);

    if (savedCart.userId === req.query.userId) {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.query._id,
        {
          $set: {
            products: req.body,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedCart);
    } else {
      res.status(500).json({ err: "u r not allowed to do that" });
    }
  } catch (err) {
    res.status(500).json({ err, msg: "something gone wrong" });
  }
};

//DELETE
const deleteCart = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide valid cart id" });
  try {
    await Cart.findByIdAndDelete(req.query._id);
    res.status(200).json({ msg: "Cart has been deleted.." });
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET BY ID // it will take user id
const getCartByUserId = async (req, res) => {
  if (!req.query.userId) res.status(500).json({ msg: "provide valid user id" });
  try {
    const fcart = await Cart.findOne({ userId: req.query.userId });
    res.status(200).json(fcart);
  } catch (err) {
    res.status(500).json({ err, msg: "cant find cart" });
  }
};

//GET BY ID // it will take user id
const getCartDetailsByUserId = async (req, res) => {
  if (!req.query.userId) res.status(500).json({ msg: "provide valid user id" });
  try {
    const fcart = await Cart.findOne({ userId: req.query.userId }).populate(
      "products.productId"
    );
    res.status(200).json(fcart);
  } catch (err) {
    res.status(500).json({ err, msg: "cant find cart" });
  }
};

//Cart Stats
const getCartStats = async (req, res) => {
  const qpage = parseInt(req.query.page) || 0;
  const qlimit = parseInt(req.query.limit) || 30;
  try {
    let Carts;
    Carts = await Cart.find()
      .sort({ createdAt: -1 })
      .skip(qpage * 20)
      .limit(qlimit);

    res.status(200).json(Carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCartByUserId,
  getCartStats,
  getCartDetailsByUserId,
};
