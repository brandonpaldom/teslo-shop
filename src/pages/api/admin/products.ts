import { db } from '@/database'
import { ProductInterface } from '@/interfaces'
import { Product } from '@/models'
import { v2 as cloudinary } from 'cloudinary'
import { isValidObjectId } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

cloudinary.config(process.env.CLOUDINARY_URL || '')

type Data = { message: string } | ProductInterface[] | ProductInterface

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res)
    case 'POST':
      return createProduct(req, res)
    case 'PUT':
      return updateProduct(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect()
  const products = await Product.find().sort({ title: 'asc' }).lean()
  await db.disconnect()

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
    })

    return product
  })

  res.status(200).json(updatedProducts)
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { images } = req.body as ProductInterface

  if (images.length < 2) {
    return res.status(400).json({ message: 'At least two images are required' })
  }

  try {
    await db.connect()
    const currentProduct = await Product.findOne({ slug: req.body.slug })

    if (currentProduct) {
      await db.disconnect()
      return res.status(400).json({ message: 'Product already exists' })
    }

    const product = await Product.create(req.body)
    await product.save()
    await db.disconnect()
    return res.status(201).json(product)
  } catch (error: any) {
    console.log(error)
    await db.disconnect()
    return res.status(400).json({ message: error.message })
  }
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { _id, images } = req.body as ProductInterface

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'Invalid product id' })
  }

  if (images.length < 2) {
    return res.status(400).json({ message: 'At least two images are required' })
  }

  try {
    await db.connect()
    const product = await Product.findById(_id)

    if (!product) {
      await db.disconnect()
      return res.status(404).json({ message: 'Product not found' })
    }

    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const publicId = image.split('/').pop()?.split('.')[0]
        await cloudinary.uploader.destroy(`teslo-shop/${publicId}`)
      }
    })

    await product.updateOne(req.body)
    await db.disconnect()
    return res.status(200).json(product)
  } catch (error: any) {
    console.log(error)
    await db.disconnect()
    return res.status(400).json({ message: error.message })
  }
}
