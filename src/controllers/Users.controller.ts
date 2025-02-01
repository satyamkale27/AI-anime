import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.mongo";
import asyncHandler from "../middlewares/tryCatch";
import { CustomError } from "../middlewares/errors/CustomError";

import { NextFunction, Request, Response } from "express";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    if (!user) throw new CustomError("unable to register", 500);
    res.status(201).json({ message: "User registered successfully" });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new CustomError("Authentication failed", 401);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new CustomError("Authentication failed", 401);

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  }
);
