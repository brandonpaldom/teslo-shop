import { SizesInterface } from './'

export interface CartInterface {
  _id: string
  images: string
  price: number
  size?: SizesInterface
  slug: string
  title: string
  gender: 'men' | 'women' | 'kid' | 'unisex'
  quantity: number
}
