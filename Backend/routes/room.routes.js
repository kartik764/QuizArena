import express from "express";

import Room from "../models/Room.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

//create a room
router.post("/create", authenticateToken, async (req, res) => {
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

//join a room
router.post("/join", authenticateToken, async (req, res) => {
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

//leave a room
router.post("/:roomCode/leave", authenticateToken, async (req, res) => {
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

//get a room by room code
router.get("/:roomCode", authenticateToken, async (req, res) => {
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

//get public rooms
router.get("/", authenticateToken, async (req, res) => {
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

export default router;