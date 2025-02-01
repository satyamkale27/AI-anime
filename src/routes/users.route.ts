import { Express } from "express";
import { Router } from "express";
import { registerUser } from "../controllers/Users.controller";
import { loginUser } from "../controllers/Users.controller";

const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
