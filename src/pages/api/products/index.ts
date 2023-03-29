import { SHOP_CONSTANTS, db } from '@/database'
import { ProductInterface } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | ProductInterface[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { gender = 'all' } = req.query

  let conditions = {}

  if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(gender as string)) {
    conditions = { gender }
  }

  await db.connect()
  const products = await Product.find(conditions).select('images inStock price slug title -_id').lean()
  await db.disconnect()

  res.status(200).json(products)
}
