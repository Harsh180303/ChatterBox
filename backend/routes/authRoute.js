import express from "express"
import { forgotPassword, logIn, logOut, resetPassword, signUp } from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post('/signup', signUp)
authRouter.post('/login', logIn)
authRouter.post('/logout', logOut)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)

export default authRouter