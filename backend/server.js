import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

// Load environment variables from .env file
dotenv.config();

// Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example route (you can replace with your actual routes)
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "HELLO WORLD AGAIN" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to database!");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Determine paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend build files
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 SERVER HAS STARTED AT PORT ${PORT}`);
  console.log("MONGO_URI:", process.env.MONGO_URI);
});
