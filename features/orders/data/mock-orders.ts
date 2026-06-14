import { Order } from "../model/types";

export const mockOrders: Order[] = [
  {
    id: "SAFO-1024",
    createdAt: "19.03.2026 14:20",
    status: "accepted",
    total: 36000,
    currency: "UZS",
    customerName: "Biloliddin", // 🔥 MUHIM
    address: "Toshkent, Chilonzor",
    phone: "+998 90 123 45 67",

    items: [
      {
        id: 1,
        title: "Safo Still Water 0.5L",
        image: "/images/products/water-bottle.png",
        volume: "0.5L",
        quantity: 2,
        price: 4000,
        currency: "UZS",
      },
      {
        id: 2,
        title: "Safo Sparkling Water 1L",
        image: "/images/products/water-bottle.png",
        volume: "1L",
        quantity: 3,
        price: 9333,
        currency: "UZS",
      },
    ],
  },
];