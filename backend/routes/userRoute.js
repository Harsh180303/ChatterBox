import { Router } from "express";
import { editProfile, getCurrentUser, getOtherUsers } from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router()

userRouter.get('/current-user', isAuth, getCurrentUser)
userRouter.get('/others', isAuth, getOtherUsers)
userRouter.put('/profile', isAuth, upload.single("image"), editProfile)

export default userRouter