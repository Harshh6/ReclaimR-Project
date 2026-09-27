const claimModel = require("../models/claimModel");

const createClaim = async (req, res) => {
  try {
    const {
      item_id,
      message,
      proof_details,
    } = req.body;

    if (!item_id) {
      return res.status(400).json({
        error: "Item ID is required",
      });
    }

    const claim = await claimModel.createClaim({
      item_id,
      user_id: req.user.id,
      message,
      proof_details,
    });

    res.status(201).json({
      success: true,
      claim,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create claim",
    });
  }
};

const getMyClaims = async (req, res) => {
  try {
    const claims = await claimModel.getClaimsByUser(
      req.user.id
    );

    res.status(200).json(claims);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch claims",
    });
  }
};

const getAllClaims = async (req, res) => {
  try {
    const claims = await claimModel.getAllClaims();

    res.status(200).json(claims);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch claims",
    });
  }
};

const getClaimById = async (req, res) => {
  try {
    const claim = await claimModel.getClaimById(
      req.params.id
    );

    if (!claim) {
      return res.status(404).json({
        error: "Claim not found",
      });
    }

    res.status(200).json(claim);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch claim",
    });
  }
};

const updateClaimStatus = async (req, res) => {
  try {
    const { status, admin_note } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        error: "Status must be approved or rejected",
      });
    }

    const claim = await claimModel.updateClaimStatus(
      req.params.id,
      status,
      admin_note
    );

    if (!claim) {
      return res.status(404).json({
        error: "Claim not found",
      });
    }

    res.status(200).json({
      success: true,
      claim,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update claim",
    });
  }
};

module.exports = {
  createClaim,
  getMyClaims,
  getAllClaims,
  getClaimById,
  updateClaimStatus,
};