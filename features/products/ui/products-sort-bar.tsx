"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import ProductsViewSwitch from "./products-view-switch";

type ProductSortOption = "popular" | "price-asc" | "price-desc" | "newest";
type ProductsViewMode = "list" | "grid";

type ProductsSortBarProps = {
  search: string;
  sort: ProductSortOption;
  totalCount: number;
  viewMode: ProductsViewMode;
  onSearchChange: (value: string) => void;
  onSortChange: (value: ProductSortOption) => void;
  onViewModeChange: (value: ProductsViewMode) => void;
};

export default function ProductsSortBar({
  search,
  sort,
  totalCount,
  viewMode,
  onSearchChange,
  onSortChange,
  onViewModeChange,
}: ProductsSortBarProps) {
  const t = useTranslations("products_page");

  return (
    <div className="w-full lg:max-w-[620px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("search_placeholder")}
            className="h-12 w-full rounded-[18px] border border-white/10 bg-[#082332] pl-11 pr-4 text-[14px] text-white outline-none transition duration-300 placeholder:text-white/35 hover:border-cyan-100/20 focus:border-cyan-200/30"
          />
        </div>

        <ProductsViewSwitch viewMode={viewMode} onChange={onViewModeChange} />
      </div>
    </div>
  );
}
