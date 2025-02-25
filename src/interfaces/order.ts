export interface Order {
  id: string;
  totalItems: number;
  subtotal: number;
  salesTax: number;
  totalDue: number;
  isPaid: boolean;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  OrderAddress: OrderAddress;
  OrderItem: OrderItem[];
}

export interface OrderAddress {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  zipCode: string;
  city: string;
  state: string;
  countryId: string;
  phone: string;
  orderId: string;
}

export interface OrderItem {
  price: number;
  quantity: number;
  size: string;
  product: OrderProduct;
}

export interface OrderProduct {
  name: string;
  slug: string;
  images: OrderProductImage[];
}

export interface OrderProductImage {
  url: string;
}

export interface UserOrder {
  id: string;
  totalItems: number;
  subtotal: number;
  salesTax: number;
  totalDue: number;
  isPaid: boolean;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  OrderAddress: UserOrderAddress;
}

export interface UserOrderAddress {
  firstName: string;
  lastName: string;
}
