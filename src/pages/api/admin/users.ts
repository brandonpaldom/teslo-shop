import { db } from '@/database'
import { UserInterface } from '@/interfaces'
import { User } from '@/models'
import { isValidObjectId } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | UserInterface[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res)
    case 'PUT':
      return updateUser(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect()
  const users = await User.find().select('-password').lean()
  await db.disconnect()
  return res.status(200).json(users)
}

async function updateUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id = '', role = '' } = req.body
  console.log(req.body)

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid user ID' })
  }

  const roles = ['client', 'admin']

  if (!roles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' })
  }

  await db.connect()
  const user = await User.findById(id)

  if (!user) {
    await db.disconnect()
    return res.status(404).json({ message: 'User not found' })
  }

  user.role = role
  await user.save()
  await db.disconnect()
  return res.status(200).json({ message: 'User updated' })
}
