'use client';

import Image from "next/image";
import { MapPin, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Product } from "../model/types";
import { formatPrice } from "../lib/format-price";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("products_page");

  return (
    <article className="group overflow-hidden rounded-[22px] border border-white/10 bg-[#071f2d]/95 shadow-[0_12px_26px_rgba(0,0,0,0.14)] backdrop-blur-sm transition duration-300 hover:border-cyan-200/14 hover:bg-[#082434]">
      <div className="grid min-h-[185px] gap-0 lg:grid-cols-[190px_minmax(0,1fr)]">
        <div className="relative flex items-center justify-center border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.018)_0%,rgba(255,255,255,0.01)_100%)] p-4 lg:border-b-0 lg:border-r lg:border-white/8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(115,215,255,0.08),transparent_42%)]" />
          <div className="pointer-events-none absolute bottom-4 left-1/2 h-3 w-[90px] -translate-x-1/2 rounded-full bg-white/10 blur-lg" />

          <div className="relative h-[115px] w-[82px] sm:h-[125px] sm:w-[88px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 82px, 88px"
            />
          </div>
        </div>

        <div className="flex flex-col p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[10px] font-medium text-cyan-100">
                  {product.badge ?? "Premium"}
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] text-white/75">
                  {product.volume}
                </span>
              </div>

              <h3 className="mt-2 text-[18px] font-semibold leading-tight text-white sm:text-[20px]">
                {product.title}
              </h3>

              <div className="mt-1.5 flex items-center gap-2 text-[13px] text-white/70">
                <MapPin size={14} className="shrink-0 text-cyan-200" />
                <span className="truncate">{product.subtitle}</span>
              </div>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <p className="text-[17px] font-semibold text-white sm:text-[18px]">
                {formatPrice(product.price)}
              </p>
              <p className="mt-1 text-[11px] text-white/50">
                {product.currency} {t("card_per_unit")}
              </p>
            </div>
          </div>

          <p className="mt-3 line-clamp-2 max-w-[560px] text-[13px] leading-5 text-white/68">
            {product.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/75">
              {t("card_tag1")}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/75">
              {t("card_tag2")}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/75">
              {t("card_tag3")}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <button className="rounded-[13px] bg-cyan-200 px-4 py-2.5 text-[13px] font-semibold text-white transition duration-300 hover:opacity-90">
              {t("card_details")}
            </button>

            <button className="inline-flex items-center gap-2 rounded-[13px] border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] font-semibold text-white transition duration-300 hover:bg-white/[0.06]">
              <ShoppingBag size={14} />
              {t("card_add")}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
