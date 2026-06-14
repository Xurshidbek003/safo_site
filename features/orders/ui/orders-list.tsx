"use client";

import { useOrdersStore } from "../store/orders-store";
import EmptyOrdersState from "./empty-orders-state";
import OrderCard from "./order-card";

export default function OrdersList() {
  const orders = useOrdersStore((state) => state.orders);

  if (!orders.length) {
    return <EmptyOrdersState />;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}