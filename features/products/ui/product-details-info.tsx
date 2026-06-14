"use client";

import { useTranslations } from "next-intl";
import { Product } from "../model/types";
import { formatPrice } from "../lib/format-price";

type ProductDetailsInfoProps = {
  product: Product;
};

export default function ProductDetailsInfo({ product }: ProductDetailsInfoProps) {
  const t = useTranslations("product_details");
  const productTitle = product.title;
  const productDescription = product.description;

  const infoItems = [
    { key: "title", label: t("info_name") },
    { key: "price", label: t("info_price") },
    { key: "volume", label: t("info_volume") },
    { key: "stock", label: t("info_stock") },
  ] as const;

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,200,255,0.08),transparent_28%)]" />

      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">{t("info_eyebrow")}</p>
        <h2 className="mt-2 text-[22px] font-semibold text-white sm:text-[24px]">{t("info_title")}</h2>
        <p className="mt-2 max-w-[600px] text-[13px] leading-6 text-white/60">{t("info_subtitle")}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {infoItems.map((item) => {
            let value: string;
            if (item.key === "title") value = productTitle;
            else if (item.key === "price") value = `${formatPrice(product.price)} ${product.currency}`;
            else if (item.key === "volume") value = product.volume;
            else value = product.inStock ? t("info_in_stock") : t("info_out_stock");

            const isStock = item.key === "stock";

            return (
              <div key={item.key} className="rounded-[20px] border border-white/8 bg-white/[0.025] p-3.5 transition hover:border-cyan-300/20 sm:p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">{item.label}</p>
                {isStock ? (
                  <div className="mt-3">
                    <span className={`inline-flex h-9 items-center rounded-full px-3 text-[12px] font-medium ${product.inStock ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200"}`}>
                      {value}
                    </span>
                  </div>
                ) : (
                  <p className="mt-2 text-[18px] font-semibold text-white sm:text-[20px]">{value}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-[20px] border border-white/8 bg-white/[0.025] p-4 sm:p-5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">{t("info_description")}</p>
          <p className="mt-2 text-[13px] leading-6 text-white/65">{productDescription}</p>
        </div>
      </div>
    </section>
  );
}
