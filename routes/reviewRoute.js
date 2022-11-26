const {
  createReview,
  updateReview,
  deleteReview,
  getReviewStats,
  getAllReviews,
  getReviewById,
  getReviewByUserId,
  getReviewByEmail,
} = require("../controllers/reviewController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewires/verifyToken");
const router = require("express").Router();

router.post("/create", verifyToken, createReview);
router.put("/update", verifyTokenAndAuthorization, updateReview);
router.delete("/delete", verifyTokenAndAuthorization, deleteReview);
router.get("/get-by-userId", verifyTokenAndAuthorization, getReviewByUserId);
router.get("/find", verifyTokenAndAuthorization, getReviewById);
router.get("/find-by-email", getReviewByEmail);
router.get("/get", getAllReviews);
router.get("/stats", verifyTokenAndAdmin, getReviewStats);

module.exports = router;
