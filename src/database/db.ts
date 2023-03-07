import mongoose from 'mongoose'

export const connect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  await mongoose.connect(process.env.MONGODB_URI as string)

  console.log('Connected to MongoDB')
}

export const disconnect = async () => {
  if (mongoose.connection.readyState === 0) {
    return
  }

  await mongoose.disconnect()

  console.log('Disconnected from MongoDB')
}
