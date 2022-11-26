const User = require("../models/userSchema");

//CREATE
const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update
const updateUser = async (req, res) => {
  if (!req.query._id) res.status(400).json({ msg: "_id not provided" });
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.query._id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ err, msg: "opps..! Error" });
  }
};

// update wishlist
const updateWishlist = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an User _id" });
  try {
    const updatedWishList = await User.findByIdAndUpdate(
      req.query._id,
      {
        $set: {
          wishlist: req.body,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedWishList);
  } catch (err) {
    res.status(500).json({ err, msg: "user not found" });
  }
};

// update admin
const updateAdmin = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an User _id" });
  try {
    const updatedWishList = await User.findByIdAndUpdate(
      req.query._id,
      {
        $set: {
          role: "admin",
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedWishList);
  } catch (err) {
    res.status(500).json({ err, msg: "user not found" });
  }
};

//DELETE
const deleteUser = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an User _id" });
  try {
    await User.findByIdAndDelete(req.query._id);
    res.status(200).json({ msg: "User has been deleted.." });
  } catch (err) {
    res.status(500).json({ err, msg: "user not found" });
  }
};

//User All
const getAllUsers = async (req, res) => {
  const qpage = req.query.page || 0;
  const qlimit = req.query.limit || 30;
  try {
    let users;

    users = await User.find()
      .sort({ createdAt: -1 })
      .skip(qpage * qlimit)
      .limit(qlimit);
    // console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get User
const getUserById = async (req, res) => {
  if (!req.query._id) res.status(500).json({ msg: "provide an User _id" });
  try {
    let userdata;
    userdata = await User.findById(req.query._id);
    // console.log(userdata);
    res.status(200).json(userdata);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//get User
const getUserByEmail = async (req, res) => {
  if (!req.query.email) res.status(500).json({ msg: "provide an email" });
  try {
    let userdata;
    userdata = await User.find({ email: req?.query?.email });
    // console.log(userdata);
    res.status(200).json(userdata);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//User STATS
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await User.aggregate([
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
  createUser,
  updateUser,
  deleteUser,
  updateWishlist,
  getAllUsers,
  getUserById,
  getUserStats,
  updateAdmin,
  getUserByEmail,
};
