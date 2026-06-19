"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useCartStore } from "../store/cart-store";
import { formatPrice } from "@/features/products/lib/format-price";

export default function CartItemsList() {
  const t = useTranslations("cart_items");
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increase = useCartStore((state) => state.increaseQuantity);
  const decrease = useCartStore((state) => state.decreaseQuantity);
  const setQuantity = useCartStore((state) => state.setQuantity);

  if (items.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#071824] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.16)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,210,255,0.06),transparent_28%)]" />
        <div className="relative">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-100">
            <Sparkles size={16} />
          </div>
          <h3 className="mt-3 text-[18px] font-semibold text-white">
            {t("empty_title")}
          </h3>
          <p className="mt-2 max-w-[420px] text-[13px] leading-6 text-white/56">
            {t("empty_desc")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: index * 0.03, ease: "easeOut" }}
          className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-[#071824] px-4 py-3 shadow-[0_14px_30px_rgba(0,0,0,0.14)] transition-all duration-300 hover:border-cyan-300/12 hover:shadow-[0_18px_38px_rgba(0,0,0,0.18)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,210,255,0.05),transparent_24%)] opacity-0 transition duration-300 group-hover:opacity-100" />

          <div className="relative grid grid-cols-[88px_minmax(0,1fr)_130px_120px] items-center gap-4">
            {/* IMAGE */}
            <div className="flex items-center justify-center">
              <div className="relative flex h-[88px] w-[74px] items-center justify-center overflow-hidden rounded-[16px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,210,255,0.10),transparent_60%)]" />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2.5 drop-shadow-[0_16px_26px_rgba(0,0,0,0.28)] transition duration-300 group-hover:scale-[1.04]"
                  sizes="74px"
                />
              </div>
            </div>

            {/* INFO */}
            <div className="min-w-0">
              <h3 className="truncate text-[16px] font-semibold tracking-tight text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-[12px] text-white/52">{item.volume}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-cyan-300/[0.08] px-2.5 py-1 text-[10px] font-medium text-cyan-200">
                  Premium
                </span>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="flex justify-center">
              <div className="flex h-10 items-center gap-1 rounded-[12px] border border-white/10 bg-white/[0.03] p-1">
                <button
                  onClick={() => decrease(item.id)}
                  aria-label={t("aria_decrease", { title: item.title })}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[9px] text-white/65 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <Minus size={14} />
                </button>

                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    setQuantity(item.id, Number.isNaN(v) ? 1 : v);
                  }}
                  onBlur={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (Number.isNaN(v) || v < 1) setQuantity(item.id, 1);
                  }}
                  aria-label={`${item.title} miqdori`}
                  className="w-12 [appearance:textfield] bg-transparent text-center text-[13px] font-semibold text-white outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                  onClick={() => increase(item.id)}
                  aria-label={t("aria_increase", { title: item.title })}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[9px] text-white/65 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* PRICE + DELETE */}
            <div className="flex items-center justify-end gap-2.5">
              <div className="min-w-[72px] text-right">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/34">
                  {t("total")}
                </p>
                <p className="mt-1 text-[17px] font-semibold leading-none tracking-tight text-white">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/36">
                  UZS
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                aria-label={t("aria_remove", { title: item.title })}
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[12px] border border-red-400/15 bg-red-400/[0.03] text-red-300 transition hover:bg-red-400/[0.10] hover:text-red-200"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </motion.div>
        
      ))}
    </div>
  );
}
