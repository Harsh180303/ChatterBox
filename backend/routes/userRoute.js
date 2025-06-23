import { Router } from "express";
import { editProfile, getCurrentUser } from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router()

userRouter.get('/current-user', isAuth, getCurrentUser)
userRouter.put('/profile', isAuth, upload.single("image"), editProfile)

export default userRouter