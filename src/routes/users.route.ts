import { Express } from "express";
import { Router } from "express";
import { registerUser } from "../controllers/Users.controller";
import { loginUser } from "../controllers/Users.controller";
import { verifyToken } from "../middlewares/authmiddleware";

const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/test", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

export default userRouter;
