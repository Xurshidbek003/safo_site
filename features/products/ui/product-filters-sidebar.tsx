"use client";

import { useTranslations } from "next-intl";

type ProductCategory = "all" | "still" | "sparkling" | "bundle";

type ProductFiltersSidebarProps = {
  category: ProductCategory;
  volume: string;
  minPrice: string;
  maxPrice: string;
  categories: { label: string; value: ProductCategory }[];
  volumes: string[];
  onCategoryChange: (value: ProductCategory) => void;
  onVolumeChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onReset: () => void;
};

export default function ProductFiltersSidebar({
  category,
  volume,
  minPrice,
  maxPrice,
  categories,
  volumes,
  onCategoryChange,
  onVolumeChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}: ProductFiltersSidebarProps) {
  const t = useTranslations("products_page");

  return (
    <aside className="h-fit rounded-[22px] border border-cyan-200/10 bg-[#031d2a]/95 p-4 shadow-[0_14px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/10 text-violet-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v3" /><path d="M18.36 5.64 16.24 7.76" /><path d="M21 12h-3" />
              <path d="m18.36 18.36-2.12-2.12" /><path d="M12 21v-3" />
              <path d="m5.64 18.36 2.12-2.12" /><path d="M3 12h3" />
              <path d="m5.64 5.64 2.12 2.12" /><circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <h2 className="text-[18px] font-semibold text-white">{t("filter_title")}</h2>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-[13px] text-white/70 transition duration-300 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" />
          </svg>
          {t("filter_clear")}
        </button>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-[13px] text-white/50">{t("filter_category")}</label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as ProductCategory)}
            className="h-11 w-full appearance-none rounded-[14px] border border-cyan-200/12 bg-[#052637] px-4 pr-10 text-[14px] text-white outline-none transition duration-300 hover:border-cyan-200/20 focus:border-cyan-200/30"
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/55">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-[13px] text-white/50">{t("filter_volume")}</label>
        <div className="relative">
          <select
            value={volume}
            onChange={(e) => onVolumeChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-[14px] border border-cyan-200/12 bg-[#052637] px-4 pr-10 text-[14px] text-white outline-none transition duration-300 hover:border-cyan-200/20 focus:border-cyan-200/30"
          >
            {volumes.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? t("vol_all") : item}
              </option>
            ))}
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/55">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-[13px] text-white/50">{t("filter_price")}</label>
        <div className="grid gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            placeholder={t("filter_price_min")}
            className="h-11 rounded-[14px] border border-cyan-200/12 bg-[#052637] px-4 text-[14px] text-white outline-none transition duration-300 placeholder:text-white/35 hover:border-cyan-200/20 focus:border-cyan-200/30"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            placeholder={t("filter_price_max")}
            className="h-11 rounded-[14px] border border-cyan-200/12 bg-[#052637] px-4 text-[14px] text-white outline-none transition duration-300 placeholder:text-white/35 hover:border-cyan-200/20 focus:border-cyan-200/30"
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[13px] text-white/50">{t("filter_quick")}</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => {
            const isActive = category === item.value;
            return (
              <button
                key={item.value}
                onClick={() => onCategoryChange(item.value)}
                className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition duration-300 ${
                  isActive
                    ? "border-cyan-200/20 bg-cyan-200/12 text-cyan-100"
                    : "border-cyan-200/12 bg-transparent text-white/82 hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex gap-2.5">
        <button
          type="button"
          className="flex-1 rounded-[14px] border-cyan-200/20 bg-[linear-gradient(180deg,#15739c_0%,#0a4f70_100%)] px-4 py-3 text-[14px] font-semibold text-white transition duration-300 hover:opacity-90"
        >
          {t("filter_apply")}
        </button>
        <button
          onClick={onReset}
          className="rounded-[14px] border border-cyan-200/12 bg-transparent px-4 py-3 text-[14px] font-semibold text-white transition duration-300 hover:bg-white/[0.04]"
        >
          {t("filter_reset")}
        </button>
      </div>
    </aside>
  );
}
