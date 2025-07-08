import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { accessChat, getMyChats } from "../controllers/chatController.js"

const chatRouter = express.Router()

chatRouter.get('/myChats', isAuth, getMyChats)
chatRouter.get('/access-chat/:receiverId', isAuth, accessChat)

export default chatRouter