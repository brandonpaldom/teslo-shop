import { tesloApi } from '@/api'
import { CartInterface, OrderInterface, ShippingAddress } from '@/interfaces'
import axios from 'axios'
import Cookies from 'js-cookie'
import { FC, useEffect, useReducer } from 'react'

import { CartContext, cartReducer } from './'

interface Props {
  children: React.ReactNode
}

export interface CartState {
  isLoaded: boolean
  cart: CartInterface[]
  numberOfProducts: number
  subTotal: number
  tax: number
  total: number
  shipingAddress?: ShippingAddress
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfProducts: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shipingAddress: undefined,
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    const cart = Cookies.get('cart')

    if (cart) {
      dispatch({
        type: 'LOAD_CART_FROM_COOKIES',
        payload: JSON.parse(cart),
      })
    }
  }, [])

  useEffect(() => {
    if (Cookies.get('firstName')) {
      const shippingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        addressLine2: Cookies.get('addressLine2') || '',
        zipCode: Cookies.get('zipCode') || '',
        city: Cookies.get('city') || '',
        state: Cookies.get('state') || '',
        phone: Cookies.get('phone') || '',
      }

      dispatch({
        type: 'LOAD_ADDRESS_FROM_COOKIES',
        payload: shippingAddress,
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
    Cookies.set('cart', JSON.stringify(state.cart))

    return () => {
      Cookies.remove('cart')
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

  const updateShippingAddress = (shippingAddress: ShippingAddress) => {
    Cookies.set('firstName', shippingAddress.firstName)
    Cookies.set('lastName', shippingAddress.lastName)
    Cookies.set('address', shippingAddress.address)
    Cookies.set('addressLine2', shippingAddress.addressLine2 || '')
    Cookies.set('zipCode', shippingAddress.zipCode)
    Cookies.set('city', shippingAddress.city)
    Cookies.set('state', shippingAddress.state)
    Cookies.set('phone', shippingAddress.phone)

    dispatch({
      type: 'UPDATE_SHIPPING_ADDRESS',
      payload: shippingAddress,
    })
  }

  const createOrder = async (): Promise<{ hasError: boolean; message: string }> => {
    if (!state.shipingAddress) {
      throw new Error('Shipping address is required')
    }

    const body: OrderInterface = {
      orderItems: state.cart.map((product) => ({
        ...product,
        size: product.size!,
        image: product.image!,
      })),
      shippingAddress: state.shipingAddress,
      numberOfProducts: state.numberOfProducts,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    }

    try {
      const { data } = await tesloApi.post<OrderInterface>('/orders', body)

      dispatch({
        type: 'ORDER_SUCCESS',
      })

      return {
        hasError: false,
        message: data._id!,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        }
      }

      return {
        hasError: true,
        message: 'Something went wrong',
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateProductQuantity,
        removeProductFromCart,
        updateShippingAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
