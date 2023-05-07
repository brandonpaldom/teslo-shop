import { SizesInterface } from './products'
import { UserInterface } from './user'

export interface OrderInterface {
  _id?: string
  user?: UserInterface | string
  orderItems: OrderItemInterface[]
  shippingAddress: ShippingAddress
  paymentResult?: string
  numberOfProducts: number
  subTotal: number
  tax: number
  total: number
  isPaid: boolean
  paidAt?: string
}

export interface OrderItemInterface {
  _id: string
  title: string
  size: SizesInterface
  quantity: number
  slug: string
  image: string
  price: number
  gender: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  addressLine2?: string
  zipCode: string
  city: string
  state: string
  phone: string
}
