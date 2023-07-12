import mongoose from 'mongoose'

export const connect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
  }
}

export const disconnect = async () => {
  if (mongoose.connection.readyState === 0) {
    return
  }

  try {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Failed to disconnect from MongoDB:', error)
  }
}
