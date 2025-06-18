import { Router } from "express";
import { getCurrentUser } from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = Router()

userRouter.get('/current-user', isAuth, getCurrentUser)

export default userRouter