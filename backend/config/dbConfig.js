import mongoose from 'mongoose'

const DbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "chatterbox",
      retryWrites: true,
      serverSelectionTimeoutMS: 5000,
    })

    console.log(`MongoDb connected ${conn.connection.host}`)
  } catch (error) {
    console.log(`MongoDb connection error: ${error}`)
    process.exit(1)
  }
}

export default DbConnect
