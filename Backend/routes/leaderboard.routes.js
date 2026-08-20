import express from "express";
import User from "../models/User.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find({
      gamesPlayed: { $gt: 0},
    })
      .select("username totalscore")
      .sort({ totalScore: -1 });

    const leaderboard = users.map((user, index) => ({
        rank: index + 1,
        username: user.username,
        score: user.totalScore,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ message : "Server error"});
  }
});

export default router;
