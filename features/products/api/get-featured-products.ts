import { getProducts } from "./get-products";

export async function getFeaturedProducts() {
  const products = await getProducts();
  return products.filter((product) => product.featured);
}
