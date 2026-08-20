import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import { initializeSocket } from "./socket/socket.js";

import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

initializeSocket(io);

connectDB();

//Middleware
app.use(cors()); //used to remove the cors error
app.use(express.json()); //used to read the json input

app.get("/", (req, res) => {
  res.send("QuizArena Backend Running");
});
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
