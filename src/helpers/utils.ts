import { CustomError } from "../middlewares/errors/CustomError.js";
import User from "../models/Users.mongo";
import { v4 as uuid } from "uuid";

export const getMediasUrls = (URI: string, objectKey: string) => {
    return `${URI}${objectKey}`
}

export const getProfileImage = (isGoogleUser: boolean, baseUrl: string, objectKey: string): string => {
    if (isGoogleUser) {
        return objectKey;
    } else {
        return getMediasUrls(baseUrl, objectKey);
    }
};

export const checkUserExists = async (email: string, userName: string) => {
    // Use a single query to check if either the email or username exists
    const user = await User.findOne({ $or: [{ email }, { userName }] });

    if (user) {
        // Check specifically which one is causing the conflict
        if (user.email === email) {
            throw new CustomError("Email already exists", 409);
        }
        if (user.userName === userName) {
            throw new CustomError("Username already exists", 409);
        }
    }
};

export const getUniqueMediaName = (fileName: string) => {
    const uuidString = uuid();
    return `${Date.now()}_${uuidString}_${fileName}`;
}