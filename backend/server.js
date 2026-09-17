const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("ReclaimR Backend is running!");
});

app.listen(PORT, () => {
  console.log(`ReclaimR backend running on http://localhost:${PORT}`);
});