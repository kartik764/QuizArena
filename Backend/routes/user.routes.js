import express from "express";
import User from "../models/User.js";
import authenticateToken from "../middleware/auth.js";
import Room from "../models/Room.js";

const router = express.Router();

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "username email avatar totalScore gamesPlayed"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Count currently available public rooms
    const activeRooms = await Room.countDocuments({
      isPrivate: false,
      status: "waiting",
      $expr: {
        $lt: [{ $size: "$players" }, "$maxPlayers"],
      },
    });

    // Find the user's current rank
    const usersAbove = await User.countDocuments({
      gamesPlayed: { $gt: 0 },
      totalScore: { $gt: user.totalScore },
    });

    const currentRank = usersAbove + 1;

    res.json({
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      totalScore: user.totalScore,
      gamesPlayed: user.gamesPlayed,
      activeRooms,
      currentRank,
    });
  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;