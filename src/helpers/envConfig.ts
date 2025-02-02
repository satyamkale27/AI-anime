import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_URI = process.env.MONGO_URI || "";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
export const PROFILE_URL = process.env.PROFILE_URL || "";
export const ANIME_URL = process.env.ANIME_URL || "";
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
export const AWS_REGION = process.env.AWS_REGION || "";
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || "";