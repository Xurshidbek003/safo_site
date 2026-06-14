import { apiPost } from "@/shared/lib/api";

export type PublicOrderItem = {
  product_id: number;
  quantity: number;
  unit_price: number;
};

export type CreateOrderPayload = {
  customer_name: string;
  phone: string;
  address?: string;
  items: PublicOrderItem[];
};

export type CreateOrderResult = {
  success: boolean;
  order_id: number;
  order_code: string;
};

// Buyurtmani backendga yuboradi — admin CRM'ida ko'rinadi
export async function createPublicOrder(payload: CreateOrderPayload) {
  return apiPost<CreateOrderResult>("/api/public/orders", payload);
}
