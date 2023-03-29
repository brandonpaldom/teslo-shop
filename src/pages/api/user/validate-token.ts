import { db } from '@/database'
import { User } from '@/models'
import { jwt } from '@/utils'
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
    case 'GET':
      return validateToken(req, res)
    default:
      return res.status(405).json({ message: 'Bad request' })
  }
}

async function validateToken(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { token = '' } = req.cookies

  let userId = ''

  try {
    userId = await jwt.verifyToken(token)
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  await db.connect()
  const user = await User.findById(userId).lean()
  await db.disconnect()

  if (!user) {
    return res.status(401).json({ message: 'User not found' })
  }

  const { _id, role, name, email } = user

  return res.status(200).json({
    token: jwt.generateToken(_id, email),
    user: {
      email,
      role,
      name,
    },
  })
}
