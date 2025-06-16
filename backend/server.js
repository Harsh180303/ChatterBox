import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import DbConnect from './config/dbConfig.js'
import authRoute from './routes/authRoute.js'
import errorMiddleware from './middlewares/errorMiddleware.js'

await DbConnect()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute)

app.get('/', (req, res) => {
  return res.send('Hello World')
})

// error middleware must be at the end

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
