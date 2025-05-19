import dotenv from "dotenv";
dotenv.config();  // Load env variables immediately

import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();

// CORS middleware to allow requests from frontend
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN",
  });
});

// Connect to MongoDB
dbConnection();

// Error handling middleware (must be after routes)
app.use(errorMiddleware);

export default app;
