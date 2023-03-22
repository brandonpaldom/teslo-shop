import { FC, useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'
import { CartContext, cartReducer } from './'
import { CartInterface } from '@/interfaces'

interface Props {
  children: React.ReactNode
}

export interface CartState {
  cart: CartInterface[]
  numberOfProducts: number
  subTotal: number
  tax: number
  total: number
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfProducts: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    const cart = Cookie.get('cart')

    if (cart) {
      dispatch({
        type: 'LOAD_CART_FROM_COOKIES',
        payload: JSON.parse(cart),
      })
    }
  }, [])

  useEffect(() => {
    const numberOfProducts = state.cart.reduce((acc, product) => acc + product.quantity, 0)
    const subTotal = state.cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.16)

    const orderSummary = {
      numberOfProducts,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal + subTotal * taxRate,
    }

    dispatch({
      type: 'UPDATE_ORDER_SUMMARY',
      payload: orderSummary,
    })
  }, [state.cart])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))

    return () => {
      Cookie.remove('cart')
    }
  }, [state.cart])

  const addProductToCart = (product: CartInterface) => {
    const productExists = state.cart.find((p) => p._id === product._id && p.size === product.size)

    if (!productExists) {
      return dispatch({
        type: 'UPDATE_CART',
        payload: [...state.cart, product],
      })
    }

    const updatedCart = state.cart.map((p) => {
      if (p._id === product._id && p.size === product.size) {
        return {
          ...p,
          quantity: p.quantity + product.quantity,
        }
      }

      return p
    })

    dispatch({
      type: 'UPDATE_CART',
      payload: [...updatedCart],
    })
  }

  const updateProductQuantity = (product: CartInterface) => {
    dispatch({
      type: 'CHANGE_CART_QUANTITY',
      payload: product,
    })
  }

  const removeProductFromCart = (product: CartInterface) => {
    dispatch({
      type: 'REMOVE_CART_PRODUCT',
      payload: product,
    })
  }

  return <CartContext.Provider value={{ ...state, addProductToCart, updateProductQuantity, removeProductFromCart }}>{children}</CartContext.Provider>
}
