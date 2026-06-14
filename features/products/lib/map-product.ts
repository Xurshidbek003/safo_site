import { Product } from "../model/types";

// Backenddagi mahsulot rasmi bo'sh bo'lsa, shu rasm ishlatiladi
const FALLBACK_IMAGE = "/images/hero/bottle-big-new.png";

export type BackendProduct = {
  id: number;
  slug: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  price: number;
  currency?: string | null;
  volume?: string | null;
  category?: string | null;
  image?: string | null;
  in_stock: boolean;
  featured: boolean;
  badge?: string | null;
};

export function mapProduct(p: BackendProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title ?? "",
    subtitle: p.subtitle ?? "",
    description: p.description ?? "",
    badge: p.badge ?? undefined,
    translationKey: "", // backend mahsulotlarida tarjima kaliti yo'q — matn backenddan olinadi
    price: p.price,
    currency: p.currency || "UZS",
    volume: p.volume ?? "",
    category: p.category || "still",
    image: p.image && p.image.trim() ? p.image : FALLBACK_IMAGE,
    inStock: p.in_stock,
    featured: p.featured,
  };
}
