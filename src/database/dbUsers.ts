import { User } from '@/models'
import bcrypt from 'bcryptjs'

import { db } from './'

export const checkUser = async (email: string, password: string) => {
  await db.connect()
  const user = await User.findOne({ email })
  await db.disconnect()

  if (!user) {
    return null
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null
  }

  const { role, name, _id } = user

  return { email: email.toLocaleLowerCase(), role, name, _id }
}

export const checkOAuthUser = async (userEmail: string, userName: string) => {
  await db.connect()
  const user = await User.findOne({ email: userEmail })

  if (user) {
    await db.disconnect()
    const { _id, name, email, role } = user

    return { _id, name, email, role }
  }

  const newUser = new User({ email: userEmail, name: userName, password: 'oauth', role: 'client' })

  await newUser.save()
  await db.disconnect()

  const { _id, name, email, role } = newUser

  return { _id, name, email, role }
}
