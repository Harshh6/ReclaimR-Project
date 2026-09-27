const express = require("express");

const {
  createClaim,
  getMyClaims,
  getAllClaims,
  getClaimById,
  updateClaimStatus,
} = require("../controllers/claimController");

const {
  verifyToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createClaim);

router.get("/my", verifyToken, getMyClaims);

router.get(
  "/",
  verifyToken,
  requireAdmin,
  getAllClaims
);

router.get(
  "/:id",
  verifyToken,
  requireAdmin,
  getClaimById
);

router.patch(
  "/:id/status",
  verifyToken,
  requireAdmin,
  updateClaimStatus
);

module.exports = router;