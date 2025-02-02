import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET_KEY } from "./envConfig"

type UserData = {
    id: string
    userName: string,
    fullName: string
    profileImage: string
    email: string
}

const generateToken = (data: UserData) => {
    const token = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: "1d" })
    return token
}

const verifyToken = (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload
    return decoded
}

export { generateToken, verifyToken }