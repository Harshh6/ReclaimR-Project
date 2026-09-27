const express = require("express");
const cors = require("cors");

const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

// Allow image data sent as base64 inside JSON requests
app.use(express.json({ limit: "10mb" }));

app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);

app.get("/", (req, res) => {
  res.send("ReclaimR Backend is running!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `ReclaimR backend running on http://localhost:${PORT}`
  );
});