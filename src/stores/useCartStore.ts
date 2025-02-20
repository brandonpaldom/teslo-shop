import { CartItem } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartItems: CartItem[];
  addItemToCart: (product: CartItem) => void;
  removeItemFromCart: (id: string, size: string) => void;
  getSummary: () => {
    totalItems: number;
    subtotal: number;
    salesTax: number;
    total: number;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addItemToCart: (product: CartItem) =>
        set((state) => {
          const { cartItems } = state;

          const existingItemIndex = cartItems.findIndex(
            (item) => item.id === product.id && item.size === product.size,
          );

          if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];

            updatedCartItems[existingItemIndex] = {
              ...updatedCartItems[existingItemIndex],
              quantity:
                updatedCartItems[existingItemIndex].quantity + product.quantity,
            };

            return { cartItems: updatedCartItems };
          }

          return { cartItems: [...cartItems, product] };
        }),
      removeItemFromCart: (id: string, size: string) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(item.id === id && item.size === size),
          ),
        })),
      getSummary: () => {
        const totalItems = get().cartItems.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        const subtotal = get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
        const salesTax = subtotal * 0.07;
        const total = subtotal + salesTax;

        return {
          totalItems,
          subtotal,
          salesTax,
          total,
        };
      },
    }),
    {
      name: "cart",
    },
  ),
);
