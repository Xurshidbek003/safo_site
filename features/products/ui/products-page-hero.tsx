"use client";

import { useTranslations } from "next-intl";
import ProductsSortBar from "./products-sort-bar";

type ProductSortOption = "popular" | "price-asc" | "price-desc" | "newest";
type ProductsViewMode = "list" | "grid";

type ProductsPageHeaderProps = {
  search: string;
  sort: ProductSortOption;
  totalCount: number;
  viewMode: ProductsViewMode;
  onSearchChange: (value: string) => void;
  onSortChange: (value: ProductSortOption) => void;
  onViewModeChange: (value: ProductsViewMode) => void;
};

export default function ProductsPageHeader({
  search,
  sort,
  totalCount,
  viewMode,
  onSearchChange,
  onSortChange,
  onViewModeChange,
}: ProductsPageHeaderProps) {
  const t = useTranslations("products_page");

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
      <div className="max-w-[560px]">
        <h1 className="text-[28px] font-semibold leading-[1.08] tracking-tight sm:text-[36px] lg:text-[30px]">
          {t("title")}
        </h1>

        <p className="mt-2 text-[14px] leading-6 text-white/70 sm:text-[15px]">
          {t("subtitle")}
        </p>
      </div>

      <ProductsSortBar
        search={search}
        sort={sort}
        totalCount={totalCount}
        viewMode={viewMode}
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
        onViewModeChange={onViewModeChange}
      />
    </div>
  );
}
