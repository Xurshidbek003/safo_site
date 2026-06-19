import { Product } from "../model/types";

// Backenddagi mahsulot rasmi bo'sh bo'lganda — kategoriya bo'yicha mos zaxira rasm
const FALLBACK_BY_CATEGORY: Record<string, string> = {
  still: "/images/hero/bottle-big-new.png",
  sparkling: "/images/hero/bottle-glass.png",
  filter: "/images/products/water-filter.png",
  pump: "/images/products/water-pump.webp",
  bundle: "/images/products/bundle.svg",
};
const DEFAULT_IMAGE = "/images/hero/bottle-big-new.png";

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
  const category = p.category || "still";
  const fallback = FALLBACK_BY_CATEGORY[category] || DEFAULT_IMAGE;
  return {
    id: p.id,
    slug: p.slug,
    title: p.title ?? "",
    subtitle: p.subtitle ?? "",
    description: p.description ?? "",
    badge: p.badge ?? undefined,
    translationKey: "",
    price: p.price,
    currency: p.currency || "UZS",
    volume: p.volume ?? "",
    category,
    image: p.image && p.image.trim() ? p.image : fallback,
    inStock: p.in_stock,
    featured: p.featured,
  };
}
