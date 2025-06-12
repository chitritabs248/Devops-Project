import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js"; // assuming app.js exports your Express app

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;

// ✅ Serve frontend build (important for Docker)
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`SERVER HAS STARTED AT PORT ${PORT}`);
});

console.log("MONGO_URI:", process.env.MONGO_URI);
