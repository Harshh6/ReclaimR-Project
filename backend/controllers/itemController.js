const itemModel = require("../models/itemModel");

const createItem = async (req, res) => {
  try {
    const item = await itemModel.createItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to create item" });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await itemModel.getItemById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await itemModel.updateItem(req.params.id, req.body);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await itemModel.deleteItem(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({
      message: "Item deleted successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};