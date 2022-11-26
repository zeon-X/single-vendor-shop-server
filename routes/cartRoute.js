const {
  createCart,
  updateCart,
  deleteCart,
  getCartStats,
  getCartByUserId,
  getCartDetailsByUserId,
} = require("../controllers/cartController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewires/verifyToken");
const router = require("express").Router();

router.post("/create", verifyToken, createCart);
router.put("/update", verifyTokenAndAuthorization, updateCart);
router.delete("/delete", verifyTokenAndAuthorization, deleteCart);
router.get("/find", verifyTokenAndAuthorization, getCartByUserId);
router.get(
  "/find-details",
  verifyTokenAndAuthorization,
  getCartDetailsByUserId
);
router.get("/stats", verifyTokenAndAdmin, getCartStats);

module.exports = router;
