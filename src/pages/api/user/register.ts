import { db } from '@/database'
import { User } from '@/models'
import { jwt, validations } from '@/utils'
import bcrypt from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | { message: string }
  | {
      token: string
      user: {
        email: string
        role: string
        name: string
      }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res)
    default:
      return res.status(405).json({ message: 'Bad request' })
  }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = '', password = '', name = '' } = req.body as { email: string; password: string; name: string }

  if (password.length < 8) {
    await db.disconnect()
    return res.status(401).json({ message: 'Password must be at least 8 characters' })
  }

  if (name.length < 3) {
    await db.disconnect()
    return res.status(401).json({ message: 'Name must be at least 3 characters' })
  }

  if (!validations.isValidEmail(email)) {
    await db.disconnect()
    return res.status(401).json({ message: 'Invalid email' })
  }

  await db.connect()
  const user = await User.findOne({ email })

  if (user) {
    return res.status(401).json({ message: 'User already exists' })
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password, 10),
    role: 'client',
    name,
  })

  try {
    await newUser.save({ validateBeforeSave: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Something went wrong' })
  }

  const { role, _id } = newUser
  const token = jwt.generateToken(_id, email)

  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  })
}
