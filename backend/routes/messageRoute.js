import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { getMessages, sendMessage } from '../controllers/messageController'
import upload from '../middlewares/multer.js'

const messageRouter = express.Router()

messageRouter.post('/send/:receiverId', isAuth, upload.single('media'), sendMessage)
messageRouter.get('/get/:chatId', isAuth, getMessages)

export default messageRouter