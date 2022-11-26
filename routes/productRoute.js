const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewires/verifyToken");
const router = require("express").Router();

router.post("/create", verifyTokenAndAdmin, createProduct);
router.put("/update", verifyTokenAndAuthorization, updateProduct);
router.delete("/delete", verifyTokenAndAuthorization, deleteProduct);
router.get("/find", getProductById);
router.get("/get", getAllProducts);
router.get("/stats", verifyTokenAndAdmin, getProductStats);

module.exports = router;
