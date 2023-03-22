import { CartInterface } from '@/interfaces'
import { CartState } from './'

type CartAction =
  | { type: 'LOAD_CART_FROM_COOKIES'; payload: CartInterface[] }
  | { type: 'UPDATE_CART'; payload: CartInterface[] }
  | { type: 'CHANGE_CART_QUANTITY'; payload: CartInterface }
  | { type: 'REMOVE_CART_PRODUCT'; payload: CartInterface }
  | {
      type: 'UPDATE_ORDER_SUMMARY'
      payload: {
        numberOfProducts: number
        subTotal: number
        tax: number
        total: number
      }
    }

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART_FROM_COOKIES':
      return {
        ...state,
        cart: [...action.payload],
      }
    case 'UPDATE_CART':
      return {
        ...state,
        cart: [...action.payload],
      }
    case 'CHANGE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product
          if (product.size !== action.payload.size) return product

          product.quantity = action.payload.quantity

          return action.payload
        }),
      }
    case 'REMOVE_CART_PRODUCT':
      return {
        ...state,
        cart: state.cart.filter((product) => !(product._id === action.payload._id && product.size === action.payload.size)),
      }
    case 'UPDATE_ORDER_SUMMARY':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
