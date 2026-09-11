
import express from "express";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

import {
  findByEmail,
  readUsers,
  writeUsers,
} from "../utils/db.js";

import { signToken } from "../utils/jwt.js";
import authenticate from "../middleware/authenticate.js";
import { blacklistToken } from "../utils/token-blacklist.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUser = findByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const users = readUsers();

    const newUser = {
      id: randomUUID(),
      email,
      passwordHash,
      role: "user",
    };

    users.push(newUser);
    writeUsers(users);

    const token = signToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    throw error;
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = findByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const matches = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!matches) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    throw error;
  }
});

// PROFILE
router.get("/profile", authenticate, (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

// LOGOUT
router.post("/logout", authenticate, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  blacklistToken(token);

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

export default router;
