import { CartInterface, ShippingAddress } from '@/interfaces'
import { createContext } from 'react'

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
  createOrder: () => Promise<{ hasError: boolean; message: string }>
}

export const CartContext = createContext({} as CartContextProps)
