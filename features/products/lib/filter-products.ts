import { Product } from "../model/types";

type ProductCategory = "all" | "still" | "sparkling" | "bundle";
type ProductSortOption = "popular" | "price-asc" | "price-desc" | "newest";

type FilterProductsParams = {
  products: Product[];
  category: ProductCategory;
  volume: string;
  sort: ProductSortOption;
};

export function filterProducts({
  products,
  category,
  volume,
  sort,
}: FilterProductsParams) {
  let filteredProducts = [...products];

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category,
    );
  }

  if (volume !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.volume === volume,
    );
  }

  switch (sort) {
    case "price-asc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    case "popular":
    default:
      filteredProducts.sort(
        (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
      );
      break;
  }

  return filteredProducts;
}