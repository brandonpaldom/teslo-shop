import { db } from '@/database'
import { OrderInterface } from '@/interfaces'
import { Order, Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type Data = { message: string } | OrderInterface

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { orderItems, total } = req.body as OrderInterface
  const session: any = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const productsIds = orderItems.map((item) => item._id)
  await db.connect()
  const dbProducts = await Product.find({ _id: { $in: productsIds } })

  try {
    const subTotal = orderItems.reduce((acc, item) => {
      const product = dbProducts.find((product) => product.id === item._id)?.price

      if (!product) {
        throw new Error('Product not found')
      }

      return product * item.quantity + acc
    }, 0)

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.16)
    const backendTotal = subTotal + subTotal * taxRate

    if (backendTotal !== total) {
      throw new Error('Total is not correct')
    }

    const userId = session.user._id
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId })
    await newOrder.save()

    return res.status(201).json(newOrder)
  } catch (error: any) {
    await db.disconnect()
    return res.status(400).json({ message: error.message })
  }
}