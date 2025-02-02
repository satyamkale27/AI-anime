import { Router } from "express";
import { registerUser, loginUser, googleLogin } from "../controllers/Users.controller";
import { verifyToken } from "../middlewares/authmiddleware";
import upload from "../middlewares/multer";

const userRouter = Router();

userRouter.post("/register", upload.single("profileImage"), registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin)
userRouter.get("/test", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

export default userRouter;
