"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Order, OrderItem, OrderStatus } from "../model/types";

type CreateOrderPayload = {
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
};

type OrdersStore = {
  orders: Order[];
  createOrder: (payload: CreateOrderPayload) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  clearOrders: () => void;
};

function generateOrderId() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SAFO-${random}`;
}

function getCreatedAt() {
  const now = new Date();
  return new Intl.DateTimeFormat("uz-UZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: [],

      createOrder: (payload) => {
        const total = payload.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        const currency = payload.items[0]?.currency ?? "UZS";

        const order: Order = {
          id: generateOrderId(),
          createdAt: getCreatedAt(),
          status: "accepted",
          total,
          currency,
          address: payload.address,
          phone: payload.phone,
          customerName: payload.customerName,
          items: payload.items,
        };

        set((state) => ({
          orders: [order, ...state.orders],
        }));

        return order;
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "safo-orders-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);