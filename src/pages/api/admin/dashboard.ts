import { db } from '@/database'
import { Order, Product, User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  numberOfOrders: number
  paidOrders: number
  notPaidOrders: number
  numberOfCustomers: number
  numberOfProducts: number
  productsOutOfStock: number
  productsWithLowStock: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect()

  const [numberOfOrders, paidOrders, numberOfCustomers, numberOfProducts, productsOutOfStock, productsWithLowStock] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: 'client' }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lt: 10 } }).count(),
  ])

  await db.disconnect()

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfCustomers,
    numberOfProducts,
    productsOutOfStock,
    productsWithLowStock,
  })
}
