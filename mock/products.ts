import type { Product } from "@/features/products/model/types";

export const products: Product[] = [
  {
    id: 1,
    slug: "safo-still-05l",

    title: "Safo Still 0.5L",
    subtitle: "Tabiiy toza ichimlik suvi",
    description: "Kundalik iste’mol uchun ideal toza suv",
    badge: "Top",

    translationKey: "products.safo_still_05l",

    price: 6000,
    currency: "UZS",
    volume: "0.5L",
    category: "still",
    image: "/images/hero/bottle-glass.png",
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    slug: "safo-still-1l",

    title: "Safo Still 1L",
    subtitle: "Toza va tabiiy suv",
    description: "Oilaviy iste’mol uchun qulay hajm",
    badge: "Popular",

    translationKey: "products.safo_still_1l",

    price: 9000,
    currency: "UZS",
    volume: "1L",
    category: "still",
    image: "/images/hero/bottle-big-new.png",
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    slug: "safo-family-5l",

    title: "Safo Family 5L",
    subtitle: "Oilaviy paket",
    description: "Uzoq muddatli foydalanish uchun ideal",
    badge: "Best Value",

    translationKey: "products.safo_family_5l",

    price: 18000,
    currency: "UZS",
    volume: "5L",
    category: "bundle",
    image: "/images/hero/bottle-big-new.png",
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    slug: "safo-family-10l",

    title: "Safo Family 10L",
    subtitle: "Katta oilalar uchun",
    description: "Eng foydali katta hajmli variant",
    badge: "Family",

    translationKey: "products.safo_family_10l",

    price: 32000,
    currency: "UZS",
    volume: "10L",
    category: "bundle",
    image: "/images/hero/image.png",
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    slug: "safo-premium-spring-1l",

    title: "Safo Premium Spring 1L",
    subtitle: "Premium sifat",
    description: "Tog‘ buloqlaridan olingan tabiiy suv",
    badge: "Premium",

    translationKey: "products.safo_premium_1l",

    price: 12000,
    currency: "UZS",
    volume: "1L",
    category: "premium",
    image: "/images/hero/bottle-premium.png",
    inStock: true,
    featured: true,
  },
  {
    id: 6,
    slug: "safo-sport-07l",

    title: "Safo Sport 0.7L",
    subtitle: "Sport uchun qulay",
    description: "Harakat paytida ichish uchun ideal",
    badge: "Sport",

    translationKey: "products.safo_sport_07l",

    price: 8000,
    currency: "UZS",
    volume: "0.7L",
    category: "sport",
    image: "/images/hero/bottle-sport.png",
    inStock: true,
    featured: true,
  },
];