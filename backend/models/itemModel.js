const pool = require("../config/db");

const createItem = async (item) => {
  const {
    title,
    description,
    category,
    type,
    location,
    date,
    time,
    status,
    image_url,
    kept_at,
    identifying_details,
    contact_method,
    contact_value,
    email,
    phone,
  } = item;

  const result = await pool.query(
    `INSERT INTO items
    (
      title,
      description,
      category,
      type,
      location,
      date,
      time,
      status,
      image_url,
      kept_at,
      identifying_details,
      contact_method,
      contact_value,
      email,
      phone
    )
    VALUES
    (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15
    )
    RETURNING *`,
    [
      title,
      description,
      category,
      type,
      location,
      date,
      time,
      status,
      image_url,
      kept_at,
      identifying_details,
      contact_method,
      contact_value,
      email,
      phone,
    ]
  );

  return result.rows[0];
};

const getAllItems = async () => {
  const result = await pool.query(
    "SELECT * FROM items ORDER BY created_at DESC"
  );

  return result.rows;
};

const getItemById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM items WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

const updateItem = async (id, item) => {
  const {
    title,
    description,
    category,
    type,
    location,
    date,
    time,
    status,
    image_url,
    kept_at,
    identifying_details,
    contact_method,
    contact_value,
    email,
    phone,
  } = item;

  const result = await pool.query(
    `UPDATE items
     SET
       title = $1,
       description = $2,
       category = $3,
       type = $4,
       location = $5,
       date = $6,
       time = $7,
       status = $8,
       image_url = $9,
       kept_at = $10,
       identifying_details = $11,
       contact_method = $12,
       contact_value = $13,
       email = $14,
       phone = $15
     WHERE id = $16
     RETURNING *`,
    [
      title,
      description,
      category,
      type,
      location,
      date,
      time,
      status,
      image_url,
      kept_at,
      identifying_details,
      contact_method,
      contact_value,
      email,
      phone,
      id,
    ]
  );

  return result.rows[0];
};

const deleteItem = async (id) => {
  const result = await pool.query(
    "DELETE FROM items WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};