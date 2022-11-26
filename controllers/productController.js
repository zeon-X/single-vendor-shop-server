const Product = require("../models/productSchema");

//CREATE
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
const updateProduct = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an product _id" });
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.query._id,
      {
        $set: req.body,
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
const deleteProduct = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an product _id" });
  try {
    await Product.findByIdAndDelete(req.query._id);
    res.status(200).json({ msg: "Product has been deleted.." });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Product All
const getAllProducts = async (req, res) => {
  const qpage = req.query.page || 0;
  const qlimit = req.query.limit || 30;
  // console.log(qlimit);
  try {
    let fproduct;

    fproduct = await Product.find()
      .sort({ createdAt: -1 })
      .skip(qpage * qlimit)
      .limit(qlimit);

    res.status(200).json(fproduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get product
const getProductById = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an product _id" });
  try {
    let fproduct = await Product.findById(req.query._id);
    res.status(200).json(fproduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Product STATS
const getProductStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Product.aggregate([
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
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductStats,
};
