import { OrderInterface } from '@/interfaces'
import { Order } from '@/models'
import { isValidObjectId } from 'mongoose'

import { db } from './'

export const getOrderById = async (id: string): Promise<OrderInterface | null> => {
  if (!isValidObjectId(id)) {
    return null
  }

  await db.connect()
  const order = await Order.findById(id).lean()
  await db.disconnect()

  if (!order) {
    return null
  }

  return JSON.parse(JSON.stringify(order))
}

export const getOrdersByUserId = async (userId: string): Promise<OrderInterface[]> => {
  if (!isValidObjectId(userId)) {
    return []
  }

  await db.connect()
  const orders = await Order.find({ user: userId }).lean()
  await db.disconnect()

  return JSON.parse(JSON.stringify(orders))
}
