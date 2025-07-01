import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { sendMessage } from '../controllers/messageController'
import upload from '../middlewares/multer.js'

const messageRouter = express.Router()

messageRouter.post('/send', isAuth, upload.single('image'), sendMessage)

export default messageRouter