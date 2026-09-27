const pool = require("../config/db");

const createItem = async (item) => {
  const { title, description, category, type, location, date, status, image_url } = item;

  const result = await pool.query(
    `INSERT INTO items
    (title, description, category, type, location, date, status, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [title, description, category, type, location, date, status, image_url]
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
  const { title, description, category, type, location, date, status, image_url } = item;

  const result = await pool.query(
    `UPDATE items
     SET title = $1,
         description = $2,
         category = $3,
         type = $4,
         location = $5,
         date = $6,
         status = $7,
         image_url = $8
     WHERE id = $9
     RETURNING *`,
    [title, description, category, type, location, date, status, image_url, id]
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