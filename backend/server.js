const express = require("express");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ReclaimR Backend is running!");
});

app.use("/api/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`ReclaimR backend running on http://localhost:${PORT}`);
});