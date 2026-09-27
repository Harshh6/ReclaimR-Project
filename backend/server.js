const express = require("express");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("ReclaimR Backend is running!");
});

app.listen(PORT, () => {
  console.log(`ReclaimR backend running on http://localhost:${PORT}`);
});