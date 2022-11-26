const Discount = require("../models/discountSchema");

//CREATE
const createDiscount = async (req, res) => {
  const newDiscount = new Discount(req.body);
  try {
    const savedProduct = await newDiscount.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const deactiveDiscount = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an product _id" });
  try {
    const updatedProduct = await Discount.findByIdAndUpdate(
      req.query._id,
      {
        $set: {
          status: "deactive",
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};
const activeDiscount = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an product _id" });
  try {
    const updatedProduct = await Discount.findByIdAndUpdate(
      req.query._id,
      {
        $set: {
          status: "active",
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteDiscount = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an product _id" });
  try {
    await Discount.findByIdAndDelete(req.query._id);
    res.status(200).json({ msg: "Discount has been deleted.." });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Discount All
const getAllDiscount = async (req, res) => {
  const qpage = req.query.page || 0;
  const qlimit = req.query.limit || 30;
  // console.log(qlimit);
  try {
    let fproduct;

    fproduct = await Discount.find()
      .sort({ createdAt: -1 })
      .skip(qpage * qlimit)
      .limit(qlimit);

    res.status(200).json(fproduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Discount All
const getAllActiveDiscount = async (req, res) => {
  const qpage = req.query.page || 0;
  const qlimit = req.query.limit || 30;
  // console.log(qlimit);
  try {
    let fproduct;

    fproduct = await Discount.find({ status: "active" })
      .sort({ createdAt: -1 })
      .skip(qpage * qlimit)
      .limit(qlimit);

    res.status(200).json(fproduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get product
const getDiscountById = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an product _id" });
  try {
    let fproduct = await Discount.findById(req.query._id);
    res.status(200).json(fproduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createDiscount,
  deactiveDiscount,
  deleteDiscount,
  getAllDiscount,
  getDiscountById,
  getAllActiveDiscount,
  activeDiscount,
};
