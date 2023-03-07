import mongoose, { Model, Schema } from 'mongoose'
import { ProductInterface } from '@/interfaces'

const productSchema = new Schema(
  {
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: 'Size must be one of the following: XS, S, M, L, XL, XXL, XXXL',
        },
        required: true,
      },
    ],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
      type: String,
      enum: {
        values: ['shirts', 'pants', 'hoodies', 'hats'],
        message: 'Type must be one of the following: shirts, pants, hoodies, hats',
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: 'Gender must be one of the following: men, women, kid, unisex',
      },
    },
  },
  { timestamps: true }
)

productSchema.index({ title: 'text', tags: 'text' })

const Product: Model<ProductInterface> = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
