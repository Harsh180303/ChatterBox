import express from "express"
import isAuth from "../middlewares/isAuth"
import { getMyChats } from "../controllers/chatController"

const chatRouter = express.Router()

chatRouter.get('/myChats', isAuth, getMyChats)

export default chatRouter