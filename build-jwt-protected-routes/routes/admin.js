import express from "express";
const adminRouter = express.Router();
import { readUsers } from "../utils/db.js";
import authorizeRole from "../middleware/authorize.js";

import authenticate from "../middleware/authenticate.js";


adminRouter.get(
  "/users",
  authenticate,
  authorizeRole("admin"),
  (req, res) => {
    const users = readUsers().map(({ passwordHash, ...user }) => user);

    res.status(200).json({ users });
  }
);

export default adminRouter