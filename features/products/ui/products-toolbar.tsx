"use client";

import { useTranslations } from "next-intl";

type ProductSortOption = "popular" | "price-asc" | "price-desc" | "newest";

type ProductsToolbarProps = {
  totalCount: number;
  sort: ProductSortOption;
  onSortChange: (value: ProductSortOption) => void;
};

export default function ProductsToolbar({
  totalCount,
  sort,
  onSortChange,
}: ProductsToolbarProps) {
  const t = useTranslations("products_page");

  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-white backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">
          {t("results_label")}
        </p>
        <p className="mt-1 text-[16px] font-semibold text-white sm:text-[18px]">
          {t("results_count", { count: totalCount })}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[220px]">
        <label
          htmlFor="products-sort"
          className="text-[11px] uppercase tracking-[0.22em] text-white/40"
        >
          {t("sort_label")}
        </label>

        <select
          id="products-sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as ProductSortOption)}
          className="h-11 rounded-full border border-white/10 bg-[#10293b] px-4 text-[13px] font-medium text-white outline-none transition duration-300 hover:border-cyan-100/20 focus:border-cyan-200/30"
        >
          <option value="popular">{t("sort_popular")}</option>
          <option value="price-asc">{t("sort_price_asc")}</option>
          <option value="price-desc">{t("sort_price_desc")}</option>
          <option value="newest">{t("sort_newest")}</option>
        </select>
      </div>
    </div>
  );
}
