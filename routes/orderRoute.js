const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByUserId,
  getOrderStats,
  getAllOrders,
} = require("../controllers/orderController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewires/verifyToken");
const router = require("express").Router();

router.post("/create", verifyToken, createOrder);
router.put("/update", verifyTokenAndAuthorization, updateOrder);
router.delete("/delete", verifyTokenAndAuthorization, deleteOrder);
router.get("/find", verifyTokenAndAuthorization, getOrderByUserId);
router.get("/get", verifyTokenAndAdmin, getAllOrders);
router.get("/stats", verifyTokenAndAdmin, getOrderStats);

module.exports = router;
