import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import DbConnect from './config/dbConfig.js'
import authRoute from './routes/authRoute.js'
import errorMiddleware from './middlewares/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import fs, { existsSync } from 'fs'
import messageRouter from './routes/messageRoute.js'
import chatRouter from './routes/chatRoute.js'
import { app, server } from './socket/socket.js'

await DbConnect()
const uploadPath = './uploads'

if(!existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath)
}

const allowedOrigins = [
  'http://localhost:5173',
  'http://192.168.29.212:5173',
  'Enter Your Frontend URL here'
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/message', messageRouter)
app.use('/api/chat', chatRouter)

app.get('/', (req, res) => {
  return res.send('Hello World')
})

// error middleware must be at the end

app.use(errorMiddleware)

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
