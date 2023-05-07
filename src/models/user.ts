import { UserInterface } from '@/interfaces'
import mongoose, { Model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ['client', 'admin'],
        message: 'Role must be one of the following: client, admin',
        default: 'client',
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
)

const User: Model<UserInterface> = mongoose.models.User || mongoose.model('User', userSchema)

export default User
