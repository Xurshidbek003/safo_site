export type OrderStatus =
  | "accepted"
  | "preparing"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  id: number | string;
  slug?: string;
  title: string;
  image: string;
  volume: string;
  quantity: number;
  price: number;
  currency: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  total: number;
  currency: string;
  address: string;
  phone: string;
  customerName: string;
  items: OrderItem[];
};