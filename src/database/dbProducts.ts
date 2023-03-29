import { ProductInterface } from '@/interfaces'
import { Product } from '@/models'

import { db } from './'

export const getProductBySlug = async (slug: string): Promise<ProductInterface | null> => {
  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()

  if (!product) {
    return null
  }

  return JSON.parse(JSON.stringify(product))
}

interface ProductSlugs {
  slug: string
}

export const getProductsSlugs = async (): Promise<ProductSlugs[]> => {
  await db.connect()
  const slugs = await Product.find().select('slug -_id').lean()
  await db.disconnect()

  return slugs
}

export const getProductsByTerm = async (term: string): Promise<ProductInterface[]> => {
  term = term.toString().toLowerCase()

  await db.connect()

  const products = await Product.find({
    $text: { $search: term },
  })
    .select('images inStock price slug title -_id')
    .lean()

  await db.disconnect()

  return products
}

export const getProducts = async (): Promise<ProductInterface[]> => {
  await db.connect()
  const products = await Product.find().select('images inStock price slug title -_id').lean()
  await db.disconnect()

  return JSON.parse(JSON.stringify(products))
}
