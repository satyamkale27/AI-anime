import { Request, Response, NextFunction } from "express";
import asyncHandler from "./tryCatch";
import { CustomError } from "./errors/CustomError";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../helpers/envConfig";

interface JwtPayload {
  userId: string;
}

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new CustomError("Access denied", 401);
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    req.userId = decoded.userId;
    next();
  }
);
