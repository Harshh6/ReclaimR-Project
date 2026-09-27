const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  return result.rows[0];
};

const createUser = async ({
  username = null,
  email,
  password_hash,
  phone,
  role = "Student",
}) => {
  const result = await pool.query(
    `INSERT INTO users
      (username, email, password_hash, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, username, email, phone, role, created_at`,
    [username, email, password_hash, phone, role]
  );

  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
  createUser,
};