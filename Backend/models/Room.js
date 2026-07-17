import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
    },

    roomName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Science", "History", "Sports", "Technology"],
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "",
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },

    maxPlayers: {
      type: Number,
      required: true,
      min: 1,
    },

    questionCount: {
      type: Number,
      required: true,
      min: 1,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["waiting", "active", "completed"],
      default: "waiting",
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
