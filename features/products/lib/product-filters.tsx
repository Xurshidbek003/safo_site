type ProductCategory = "all" | "still" | "sparkling" | "filter" | "pump" | "bundle";
type ProductSortOption = "popular" | "price-asc" | "price-desc" | "newest";

type ProductFiltersProps = {
  category: ProductCategory;
  volume: string;
  sort: ProductSortOption;
  onCategoryChange: (value: ProductCategory) => void;
  onVolumeChange: (value: string) => void;
  onReset: () => void;
};

const categories: { label: string; value: ProductCategory }[] = [
  { label: "Barchasi", value: "all" },
  { label: "Still Water", value: "still" },
  { label: "Sparkling", value: "sparkling" },
  { label: "Bundle", value: "bundle" },
];

const volumes = ["all", "0.5L", "1L", "5L", "10L"];

export default function ProductFilters({
  category,
  volume,
  onCategoryChange,
  onVolumeChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <aside className="h-fit rounded-[28px] border border-white/10 bg-white/[0.03] p-5 text-white shadow-[0_18px_44px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">
            Filters
          </p>
          <h3 className="mt-1 text-[18px] font-semibold text-white">
            Mahsulotlarni saralash
          </h3>
        </div>

        <button
          onClick={onReset}
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/70 transition duration-300 hover:text-cyan-100"
        >
          Tozalash
        </button>
      </div>

      <div className="mt-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
          Kategoriya
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((item) => {
            const isActive = category === item.value;

            return (
              <button
                key={item.value}
                onClick={() => onCategoryChange(item.value)}
                className={`rounded-full px-4 py-2.5 text-[12px] font-semibold transition duration-300 ${
                  isActive
                    ? "border border-cyan-200/20 bg-cyan-200/12 text-cyan-100"
                    : "border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.07]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
          Hajm
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {volumes.map((item) => {
            const isActive = volume === item;

            return (
              <button
                key={item}
                onClick={() => onVolumeChange(item)}
                className={`rounded-[16px] border px-4 py-3 text-[12px] font-semibold transition duration-300 ${
                  isActive
                    ? "border-cyan-200/20 bg-cyan-200/12 text-cyan-100"
                    : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.07]"
                }`}
              >
                {item === "all" ? "Barchasi" : item}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}