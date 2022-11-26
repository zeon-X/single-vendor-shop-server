const {
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
  getAllUsers,
  getUserById,
  updateWishlist,
  updateAdmin,
  getUserByEmail,
} = require("../controllers/userController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewires/verifyToken");
const router = require("express").Router();

// user & admin
router.put("/update", verifyTokenAndAuthorization, updateUser);
router.put("/update-wish-list", verifyTokenAndAuthorization, updateWishlist);
router.get("/find", verifyTokenAndAuthorization, getUserById);
router.get("/find-by-email", verifyTokenAndAuthorization, getUserByEmail);

// admin
router.put("/make-admin", verifyTokenAndAdmin, updateAdmin);
router.post("/create", verifyTokenAndAdmin, createUser);
router.delete("/delete", verifyTokenAndAdmin, deleteUser);
router.get("/get", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;
