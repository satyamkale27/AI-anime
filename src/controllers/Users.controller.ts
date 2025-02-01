import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.mongo";
import asyncHandler from "../middlewares/tryCatch";
import { CustomError } from "../middlewares/errors/CustomError";

import { Request, Response } from "express";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
    if (!user) return new CustomError("unable to register", 500);
  }
);
