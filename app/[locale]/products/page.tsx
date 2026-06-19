"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { getProducts } from "@/features/products/api/get-products";
import { Product } from "@/features/products/model/types";
import { filterProducts } from "@/features/products/lib/filter-products";
import EmptyProductsState from "@/features/products/ui/empty-products-state";
import ProductFiltersSidebar from "@/features/products/ui/product-filters-sidebar";
import ProductsGrid from "@/features/products/ui/products-grid";
import ProductsPageHeader from "@/features/products/ui/products-page-hero";

type ProductCategory = "all" | "still" | "sparkling" | "filter" | "pump" | "bundle";
type ProductSortOption = "popular" | "price-asc" | "price-desc" | "newest";
type ProductsViewMode = "list" | "grid";

export default function ProductsPage() {
  const t = useTranslations("products_page");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (active) setAllProducts(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const [category, setCategory] = useState<ProductCategory>("all");
  const [volume, setVolume] = useState("all");
  const [sort, setSort] = useState<ProductSortOption>("popular");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [viewMode, setViewMode] = useState<ProductsViewMode>("list");

  const categories: { label: string; value: ProductCategory }[] = [
    { label: t("cat_all"), value: "all" },
    { label: "Suv", value: "still" },
    { label: "Gazlangan", value: "sparkling" },
    { label: "Filtrlar", value: "filter" },
    { label: "Nasoslar", value: "pump" },
    { label: "To'plam", value: "bundle" },
  ];

  const volumes = ["all", "0.5L", "1L", "5L", "10L"];

  const filteredProducts = useMemo(() => {
    const base = filterProducts({ products: allProducts, category, volume, sort });
    const query = search.trim().toLowerCase();

    let result = !query
      ? base
      : base.filter((product) =>
          product.title.toLowerCase().includes(query) ||
          product.subtitle.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.volume.toLowerCase().includes(query)
        );

    if (minPrice.trim() !== "") {
      result = result.filter((product) => product.price >= Number(minPrice));
    }
    if (maxPrice.trim() !== "") {
      result = result.filter((product) => product.price <= Number(maxPrice));
    }

    return result;
  }, [allProducts, category, volume, sort, search, minPrice, maxPrice]);

  const handleResetFilters = () => {
    setCategory("all");
    setVolume("all");
    setSort("popular");
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <main className="overflow-x-hidden bg-[#06131d] text-white">
      <section className="relative overflow-hidden bg-[#081b29] pt-24 text-white sm:pt-28 lg:pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#081b29_0%,#071a28_50%,#061724_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(89,201,255,0.07),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(89,201,255,0.05),transparent_20%)]" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10 lg:pb-16">
          <ProductsPageHeader
            search={search}
            sort={sort}
            totalCount={filteredProducts.length}
            viewMode={viewMode}
            onSearchChange={setSearch}
            onSortChange={setSort}
            onViewModeChange={setViewMode}
          />

          <div className="mt-6 grid items-start gap-4 xl:grid-cols-[400px_minmax(0,1fr)] 2xl:grid-cols-[340px_minmax(0,1fr)]">
            <ProductFiltersSidebar
              category={category}
              volume={volume}
              minPrice={minPrice}
              maxPrice={maxPrice}
              categories={categories}
              volumes={volumes}
              onCategoryChange={setCategory}
              onVolumeChange={setVolume}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onReset={handleResetFilters}
            />

            <div className="products-scroll xl:h-[calc(100vh-180px)] xl:overflow-y-auto xl:pr-2">
              {loading ? (
                <div className="flex h-[300px] items-center justify-center text-[14px] text-white/50">
                  Yuklanmoqda...
                </div>
              ) : filteredProducts.length > 0 ? (
                <ProductsGrid products={filteredProducts} viewMode={viewMode} />
              ) : (
                <EmptyProductsState onReset={handleResetFilters} />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
