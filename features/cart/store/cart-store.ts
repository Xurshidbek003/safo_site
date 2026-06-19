import { create } from "zustand";
import { CartItem } from "../model/types";

type AddToCartPayload = Omit<CartItem, "quantity">;

type CartStore = {
  items: CartItem[];
  addItem: (product: AddToCartPayload, quantity?: number) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (product, quantity = 1) =>
    set((state) => {
      const qty = Math.max(1, Math.floor(quantity) || 1);
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + qty }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: qty }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  increaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      ),
    })),

  setQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.floor(quantity) || 1) }
          : item
      ),
    })),

  clearCart: () => set({ items: [] }),
}));