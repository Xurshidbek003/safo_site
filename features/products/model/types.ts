

export type Product = {
  id: number;
  slug: string;

  // Fallback (default UZ) matnlar
  title: string;
  subtitle: string;
  description: string;
  badge?: string;

  // Tarjima kaliti — messages/uz.json va ru.json dagi product_data.pN
  translationKey: string;

  price: number;
  currency: string;
  volume: string;
  category: string;
  image: string;
  inStock: boolean;
  featured: boolean;
};
