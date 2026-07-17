import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Room from "./models/Room.js";
import authenticateToken from "./middleware/auth.js";

// This command is written to use the env variable inside the file
dotenv.config();

const app = express();

//Render assigns a port using an environment variable. When deployed, the backend uses that port; otherwise, it runs on port 3000 locally.
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

//bring connectDB function here
import connectDB from "./config/db.js";

//function runs whether connection exist or not
connectDB();

//Middleware
app.use(cors()); //used to remove the cors error
app.use(express.json()); //used to read the json input

// *********************{Router Handles}******************************

//1. Testing Route
app.get("/", (req, res) => {
  res.send("QuizArena Backend Running");
});

//2. API for register/signup for new user
app.post("/register", async (req, res) => {
  try {
    //Extract email and password
    const { username, email, password } = req.body;

    //validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide all the info",
      });
    }

    //check if user exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "email already in use",
      });
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //success status
    res.status(201).json({
      status: "success",
      message: "User Created Successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Registration error : ", error.message);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

//3. API for login for existing user
app.post("/login", async (req, res) => {
  try {
    //extract email and password from req body
    const { email, password } = req.body;

    //validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all the info",
      });
    }

    //check user details
    const userDetails = await User.findOne({ email });

    // if user details not found
    if (userDetails == null) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare entered password with hashed password in database
    const hashedPassword = userDetails.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    //generate jwt token for authorised users
    const token = jwt.sign(
      {
        userId: userDetails._id,
        email: userDetails.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    //successful login response
    return res.status(200).json({
      message: "Login successfully",
      token: token,
      user: {
        id: userDetails._id,
        username: userDetails.username,
        email: userDetails.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//4. API for creating a room
app.post("/room/create", authenticateToken, async (req, res) => {
  try {
    //recive the user typed inputs
    const {
      roomName,
      category,
      difficulty,
      maxPlayers,
      questionCount,
      isPrivate,
    } = req.body;

    // validate the input data
    if (
      !roomName.trim() ||
      !category ||
      !difficulty ||
      !maxPlayers ||
      !questionCount
    ) {
      return res.status(400).json({
        message: "Please provide all room deatils",
      });
    }

    if (maxPlayers < 2 || maxPlayers > 25) {
      return res.status(400).json({
        message: "Room must allow appropriate no of players",
      });
    }

    if (questionCount < 5 || questionCount > 30) {
      return res.status(400).json({
        message: "Questions amount is inappropriate for multiplayer quiz",
      });
    }

    //fetch the hostId from middleware
    const hostId = req.user.userId;

    // generate the roomCode creating by host
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // create a room and store it in database
    const room = await Room.create({
      roomCode,
      roomName,
      category,
      difficulty,
      isPrivate,
      maxPlayers,
      questionCount,
      host: hostId,
      players: [hostId],
      status: "waiting",
    });

    return res.status(201).json({
      message: "Room Created Successfully",
      roomCode: room.roomCode,
    });
  } catch (error) {
    console.error("Create Room Error:", error.message);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
});

//5. API call for joining room
app.post("/room/join", authenticateToken, async (req, res) => {
  try {
    const playerId = req.user.userId;

    const { roomCode } = req.body;

    //validate room code
    if (!roomCode) {
      return res.status(400).json({
        message: "Room code is required",
      });
    }

    //Find room
    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({
        message: "Room Not Found",
      });
    }

    // Check if max limit of players in room reach or not
    if (room.players.length >= room.maxPlayers) {
      return res.status(400).json({
        message: "Room is full",
      });
    }

    // Check if player already joined
    const playerExist = room.players.some(
      (player) => player.toString() === playerId,
    );

    if (playerExist) {
      return res.status(409).json({
        message: "Player already inside the room",
      });
    }

    // Add player to room
    room.players.push(playerId);

    await room.save();

    return res.status(200).json({
      message: "Room Joined Successfully",
      roomCode: room.roomCode,
    });
  } catch (error) {
    console.error("Join Room Error:", error.message);

    return res.status(500).json({
      message: "Internal Server error",
    });
  }
});

//6. API call for leaving a room
app.post("/room/:roomCode/leave", authenticateToken, async (req, res) => {
  try {
    const { roomCode } = req.params;

    const playerId = req.user.userId;

    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    if (room.host.toString() === playerId) {
      await Room.deleteOne({ _id: room._id });

      return res.status(200).json({
        message: "Host left. Room deleted",
      });
    }

    room.players = room.players.filter(
      (player) => player.toString() !== playerId,
    );

    await room.save();

    return res.status(200).json({
      message: "Player left room.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//7. API call for getting a room with roomCode
app.get("/room/:roomCode", authenticateToken, async (req, res) => {
  try {
    const { roomCode } = req.params;

    const room = await Room.findOne({ roomCode })
      .populate("host", "username")
      .populate("players", "username");

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    return res.status(200).json({
      roomCode: room.roomCode,
      roomName: room.roomName,
      category: room.category,
      difficulty: room.difficulty,
      questionCount: room.questionCount,
      maxPlayers: room.maxPlayers,
      isPrivate: room.isPrivate,
      host: room.host,
      players: room.players,
      status: room.status,
    });
  } catch (error) {
    console.error("Get Room Error:", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//8. API call for getting public rooms
app.get("/rooms", authenticateToken, async (req, res) => {
  try {
    const rooms = await Room.find({
      isPrivate: false,
      status: "waiting",
    });

    const availableRooms = rooms.filter((room) => {
      return room.players.length < room.maxPlayers;
    });

    return res.status(200).json(availableRooms);

  } catch (error) {
    console.error("Get Room Error:", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
