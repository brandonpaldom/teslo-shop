import { db } from '@/database'
import { ProductInterface } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | ProductInterface[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  let { query = '' } = req.query

  if (query.length === 0) {
    return res.status(400).json({ message: 'Must provide a query' })
  }

  query = query.toString().toLowerCase()

  await db.connect()
  const products = await Product.find({
    $text: { $search: query },
  })
    .select('images inStock price slug title -_id')
    .lean()
  await db.disconnect()

  res.status(200).json(products)
}
