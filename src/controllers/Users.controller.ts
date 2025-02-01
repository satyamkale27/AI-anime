import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.mongo";
import asyncHandler from "../middlewares/tryCatch";
import { CustomError } from "../middlewares/errors/CustomError";
import { JWT_SECRET_KEY } from "../helpers/envConfig";

import { NextFunction, Request, Response } from "express";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Authentication failed", 401);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new CustomError("Authentication failed", 401);

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  }
);
