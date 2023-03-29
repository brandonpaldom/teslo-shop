import { CartInterface } from '@/interfaces'
import { createContext } from 'react'

import { ShippingAddress } from './'

interface CartContextProps {
  isLoaded: boolean
  cart: CartInterface[]
  addProductToCart: (product: CartInterface) => void
  updateProductQuantity: (product: CartInterface) => void
  removeProductFromCart: (product: CartInterface) => void
  numberOfProducts: number
  subTotal: number
  tax: number
  total: number
  shipingAddress?: ShippingAddress
  updateShippingAddress: (shippingAddress: ShippingAddress) => void
}

export const CartContext = createContext({} as CartContextProps)
