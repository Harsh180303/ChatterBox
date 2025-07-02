import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { sendMessage } from '../controllers/messageController'
import upload from '../middlewares/multer.js'

const messageRouter = express.Router()

messageRouter.post('/send/:receiverId', isAuth, upload.single('media'), sendMessage)

export default messageRouter