import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.mongo";
import asyncHandler from "../middlewares/tryCatch";
import { CustomError } from "../middlewares/errors/CustomError";
import { JWT_SECRET_KEY } from "../helpers/envConfig";
import { upload } from "../helpers/s3";

import { NextFunction, Request, Response } from "express";

export const registerUser = [
  upload.single("profileImage"),
  asyncHandler(async (req: Request, res: Response) => {
    const { fullName, userName, email, password } = req.body;
    if (!req.file) {
      throw new CustomError("Profile image is required", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const findUser = await User.findOne({ userName });
    if (findUser?.userName === userName)
      throw new CustomError("userName already exists", 409);
    const user = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      profileImage: req.file.key,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  }),
];

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("User not found", 401);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new CustomError("Incorrect password", 401);

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  }
);
