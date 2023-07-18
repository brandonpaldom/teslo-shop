import { db } from '@/database'
import { User } from '@/models'
import { jwt } from '@/utils'
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
      return loginUser(req, res)
    default:
      return res.status(405).json({ message: 'Bad request' })
  }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = '', password = '' } = req.body
  await db.connect()
  const user = await User.findOne({ email })
  await db.disconnect()

  if (!user) {
    return res.status(401).json({ message: 'User not found' })
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(401).json({ message: 'Incorrect password' })
  }

  const { role, name, _id } = user
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
