  import { configDotenv } from "dotenv";
  configDotenv(); // Load .env file

  import express from "express";
  import cors from "cors";
  import mongoose from "mongoose";
  import path from "path";
  import { fileURLToPath } from "url";

  import authRoutes from "./routes/auth.js";
  import eventRoutes from "./routes/events.js";

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const app = express();
  app.use(cors());
  app.use(express.json());

  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB error:", err));

  app.use("/api/auth", authRoutes);
  app.use("/api/events", eventRoutes);

  export default app; // ✅ Do not use app.listen
