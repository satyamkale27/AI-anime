import { Router } from "express";
import { registerUser, loginUser, googleLogin } from "../controllers/Users.controller";
import upload from "../middlewares/multer";

const userRouter = Router();

userRouter.post("/register", upload.single("profileImage"), registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin)

export default userRouter;
