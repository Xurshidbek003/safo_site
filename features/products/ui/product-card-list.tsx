"use client";

import Image from "next/image";
import { MapPin, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { Product } from "../model/types";
import { formatPrice } from "../lib/format-price";
import { useCartStore } from "@/features/cart/store/cart-store";
import { toast } from "sonner";

type ProductCardListProps = {
  product: Product;
};

export default function ProductCardList({ product }: ProductCardListProps) {
  const t = useTranslations("products_page");
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const productTitle = product.title;
  const productSubtitle = product.subtitle;
  const productDescription = product.description;
  const productBadge = product.badge ?? "";

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      title: productTitle,
      volume: product.volume,
      image: product.image,
      price: product.price,
      currency: product.currency as "UZS"
    });

    toast.success(t("toast_title"), {
      description: t("toast_desc", { title: productTitle, volume: product.volume }),
      action: {
        label: t("toast_action"),
        onClick: () => router.push("/cart"),
      },
    });
  };

  return (
    <article className="group overflow-hidden rounded-[22px] border border-white/10 bg-[#071f2d]/95 shadow-[0_12px_26px_rgba(0,0,0,0.14)] backdrop-blur-sm transition duration-300 hover:border-cyan-200/14 hover:bg-[#082434]">
      <div className="grid min-h-[185px] gap-0 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="relative flex items-center justify-center border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.018)_0%,rgba(255,255,255,0.01)_100%)] p-4 lg:border-b-0 lg:border-r lg:border-white/8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(115,215,255,0.08),transparent_42%)]" />
          <div className="pointer-events-none absolute bottom-4 left-1/2 h-3 w-[90px] -translate-x-1/2 rounded-full bg-white/10 blur-lg" />
          <div className="relative h-[145px] w-[100px] sm:h-[165px] sm:w-[115px]">
            <Image
              src={product.image}
              alt={productTitle}
              fill
              className="object-contain transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100px, 115px"
            />
          </div>
        </div>

        <div className="flex flex-col p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[10px] font-medium text-cyan-100">
                  {productBadge}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] text-white/75">
                  {product.volume}
                </span>
              </div>
              <h3 className="mt-2 text-[18px] font-semibold leading-tight text-white sm:text-[20px]">
                {productTitle}
              </h3>
              <div className="mt-1.5 flex items-center gap-2 text-[13px] text-white/70">
                <MapPin size={14} className="shrink-0 text-cyan-200" />
                <span className="truncate">{productSubtitle}</span>
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
            {productDescription}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/75">{t("card_tag1")}</span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/75">{t("card_tag2")}</span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/75">{t("card_tag3")}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link
              href={`/products/${product.slug}`}
              className="rounded-[13px] border border-cyan-200/20 bg-[linear-gradient(180deg,#15739c_0%,#0a4f70_100%)] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(10,80,120,0.35)] transition duration-300 hover:border-cyan-100/30 hover:brightness-110"
            >
              {t("card_details")}
            </Link>
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 rounded-[13px] border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[13px] font-semibold text-white/92 shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition duration-300 hover:border-cyan-200/18 hover:bg-cyan-200/[0.06] hover:text-white"
            >
              <ShoppingBag size={14} />
              {t("card_add")}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
