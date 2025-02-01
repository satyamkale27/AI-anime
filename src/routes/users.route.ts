import { Express } from "express";
import { Router } from "express";
import { registerUser } from "../controllers/Users.controller";
const userRouter = Router();
userRouter.post("/register", registerUser);

export default userRouter;
