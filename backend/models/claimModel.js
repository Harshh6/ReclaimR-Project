const pool = require("../config/db");

const createClaim = async ({
  item_id,
  user_id,
  message,
  proof_details,
}) => {
  const result = await pool.query(
    `INSERT INTO claims
      (item_id, user_id, message, proof_details)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [item_id, user_id, message, proof_details]
  );

  return result.rows[0];
};

const getClaimsByUser = async (user_id) => {
  const result = await pool.query(
    `SELECT
       c.*,
       i.title AS item_title,
       i.type AS item_type,
       i.location AS item_location
     FROM claims c
     JOIN items i ON c.item_id = i.id
     WHERE c.user_id = $1
     ORDER BY c.created_at DESC`,
    [user_id]
  );

  return result.rows;
};

const getAllClaims = async () => {
  const result = await pool.query(
    `SELECT
       c.*,
       i.title AS item_title,
       i.type AS item_type,
       i.location AS item_location,
       u.email AS user_email,
       u.phone AS user_phone
     FROM claims c
     JOIN items i ON c.item_id = i.id
     JOIN users u ON c.user_id = u.id
     ORDER BY c.created_at DESC`
  );

  return result.rows;
};

const getClaimById = async (id) => {
  const result = await pool.query(
    `SELECT
       c.*,
       i.title AS item_title,
       i.type AS item_type,
       i.location AS item_location,
       u.email AS user_email,
       u.phone AS user_phone
     FROM claims c
     JOIN items i ON c.item_id = i.id
     JOIN users u ON c.user_id = u.id
     WHERE c.id = $1`,
    [id]
  );

  return result.rows[0];
};

const updateClaimStatus = async (
  id,
  status,
  admin_note
) => {
  const result = await pool.query(
    `UPDATE claims
     SET
       status = $1,
       admin_note = $2,
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING *`,
    [status, admin_note || null, id]
  );

  return result.rows[0];
};

module.exports = {
  createClaim,
  getClaimsByUser,
  getAllClaims,
  getClaimById,
  updateClaimStatus,
};