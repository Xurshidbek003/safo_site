import { Product } from "../model/types";
import ProductCardGrid from "./product-card-grid";
import ProductCardList from "./product-card-list";

type ProductsViewMode = "list" | "grid";

type ProductsGridProps = {
  products: Product[];
  viewMode: ProductsViewMode;
};

export default function ProductsGrid({
  products,
  viewMode,
}: ProductsGridProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
        {products.map((product) => (
          <ProductCardGrid key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {products.map((product) => (
        <ProductCardList key={product.id} product={product} />
      ))}
    </div>
  );
}