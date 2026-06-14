import { PackageSearch } from "lucide-react";
import Link from "next/link";

export default function EmptyOrdersState() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#071824] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(50,180,255,0.06),transparent_30%)]" />

      <div className="relative z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-100">
          <PackageSearch size={18} />
        </div>

        <h3 className="mt-4 text-[20px] font-semibold text-white">
          Sizda hali buyurtmalar yo‘q
        </h3>

        <p className="mt-2 max-w-[520px] text-[14px] leading-6 text-white/58">
          Mahsulot tanlab, buyurtma berganingizdan keyin ular shu yerda
          ko‘rinadi.
        </p>

        <Link
          href="/products"
          className="mt-5 inline-flex h-10 items-center justify-center rounded-[12px] bg-gradient-to-r from-cyan-500 to-blue-600 px-5 text-[13px] font-semibold text-white"
        >
          Mahsulotlarga o‘tish
        </Link>
      </div>
    </div>
  );
}