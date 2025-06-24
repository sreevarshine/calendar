// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(buildPath));
  app.get("*", (req, res) =>
    res.sendFile(path.join(buildPath, "index.html"))
  );
}

module.exports = app; // ✅ Do not use app.listen
