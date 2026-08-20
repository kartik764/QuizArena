import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

//Register API
router.post("/register", async (req, res) => {
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
    return res.status(201).json({
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

//Login API
router.post("/login", async (req, res) => {
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
    if (!userDetails) {
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

export default router;