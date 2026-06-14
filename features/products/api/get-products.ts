import { apiGet } from "@/shared/lib/api";
import { Product } from "../model/types";
import { mapProduct, BackendProduct } from "../lib/map-product";

// Backenddan barcha mahsulotlarni oladi
export async function getProducts(): Promise<Product[]> {
  try {
    const data = await apiGet<BackendProduct[]>("/api/public/products");
    return Array.isArray(data) ? data.map(mapProduct) : [];
  } catch {
    return [];
  }
}
