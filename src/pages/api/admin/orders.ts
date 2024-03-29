import { db } from '@/database'
import { OrderInterface } from '@/interfaces'
import { Order } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | OrderInterface[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getOrders(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function getOrders(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect()
  const orders = await Order.find().sort({ createdAt: 'desc' }).populate('user', 'name email').lean()
  await db.disconnect()

  return res.status(200).json(orders)
}
