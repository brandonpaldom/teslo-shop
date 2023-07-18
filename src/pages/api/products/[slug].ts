import { db } from '@/database'
import { ProductInterface } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | ProductInterface | string[]

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

  const updatedProduct = product.images.map((image) => {
    return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
  })

  res.status(200).json(updatedProduct)
}
