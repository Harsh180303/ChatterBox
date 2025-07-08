import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getMyChats } from "../controllers/chatController.js"

const chatRouter = express.Router()

chatRouter.get('/myChats', isAuth, getMyChats)

export default chatRouter