import { ListFilter, LayoutGrid } from "lucide-react";

type ProductsViewMode = "list" | "grid";

type ProductsViewSwitchProps = {
  viewMode: ProductsViewMode;
  onChange: (value: ProductsViewMode) => void;
};

export default function ProductsViewSwitch({
  viewMode,
  onChange,
}: ProductsViewSwitchProps) {
  return (
    <div className="flex items-center gap-3 mt-3">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`flex h-12 w-12 items-center justify-center rounded-[16px] border transition duration-300 ${
          viewMode === "grid"
            ? "border-white/10 bg-cyan-700 text-white"
            : "border-white/10 bg-[#082332] text-white/80 hover:border-cyan-100/20 hover:text-white"
        }`}
      >
        <LayoutGrid size={18} />
      </button>

      <button
        type="button"
        onClick={() => onChange("list")}
        className={`flex h-12 w-12 items-center justify-center rounded-[16px] border transition duration-300 ${
          viewMode === "list"
            ? "border-white/10 bg-cyan-700 text-white"
            : "border-white/10 bg-[#082332] text-white/80 hover:border-cyan-100/20 hover:text-white"
        }`}
      >
        <ListFilter size={18} />
      </button>
    </div>
  );
}