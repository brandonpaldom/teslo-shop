import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Product } from '@/models'
import { ProductInterface } from '@/interfaces'

type Data = { message: string } | ProductInterface

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProduct(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function getProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect()
  const { slug } = req.query
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.status(200).json(product)
}
