import { createContext } from 'react'
import { CartInterface } from '@/interfaces'

interface CartContextProps {
  cart: CartInterface[]
  addProductToCart: (product: CartInterface) => void
  updateProductQuantity: (product: CartInterface) => void
  removeProductFromCart: (product: CartInterface) => void
  numberOfProducts: number
  subTotal: number
  tax: number
  total: number
}

export const CartContext = createContext({} as CartContextProps)
