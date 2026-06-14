"use client";

import { Droplets, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Product } from "../model/types";

type ProductDetailsHighlightsProps = {
  product: Product;
};

export default function ProductDetailsHighlights({ product }: ProductDetailsHighlightsProps) {
  const t = useTranslations("product_details");
  const productTitle = product.title;

  const highlightItems = [
    { icon: Droplets, title: t("highlight1_title"), text: t("highlight1_text") },
    { icon: ShieldCheck, title: t("highlight2_title"), text: t("highlight2_text") },
    { icon: Sparkles, title: t("highlight3_title"), text: t("highlight3_text") },
  ];

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#071824] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,220,255,0.06),transparent_28%)]" />

      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">{t("highlights_eyebrow")}</p>
        <h2 className="mt-2 text-[22px] font-semibold text-white sm:text-[24px]">
          {t("highlights_title", { title: productTitle })}
        </h2>
        <p className="mt-2 max-w-[600px] text-[13px] leading-6 text-white/60">{t("highlights_subtitle")}</p>

        <div className="mt-5 grid gap-3">
          {highlightItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[20px] border border-white/8 bg-white/[0.025] p-4 transition duration-300 hover:border-cyan-300/16 hover:bg-white/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-200/12 bg-cyan-200/8 text-cyan-100">
                    <Icon size={16} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-6 text-white/62">{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
