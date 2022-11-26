const {
  createDiscount,
  deleteDiscount,
  getAllDiscount,
  getDiscountById,
  getAllActiveDiscount,
  activeDiscount,
  deactiveDiscount,
} = require("../controllers/discountController");
const { verifyTokenAndAdmin } = require("../middlewires/verifyToken");
const router = require("express").Router();

router.post("/create", verifyTokenAndAdmin, createDiscount);
router.put("/deactive", verifyTokenAndAdmin, deactiveDiscount);
router.put("/active", verifyTokenAndAdmin, activeDiscount);
router.delete("/delete", verifyTokenAndAdmin, deleteDiscount);
router.get("/find", verifyTokenAndAdmin, getDiscountById);
router.get("/get-all", verifyTokenAndAdmin, getAllDiscount);
router.get("/get-active", getAllActiveDiscount);

module.exports = router;
