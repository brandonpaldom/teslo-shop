export interface ProductInterface {
  _id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: SizesInterface[]
  slug: string
  tags: string[]
  title: string
  type: TypesInterface
  gender: 'men' | 'women' | 'kid' | 'unisex'
}

export type SizesInterface = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
export type TypesInterface = 'shirts' | 'pants' | 'hoodies' | 'hats'
