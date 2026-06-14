"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { Product } from "../model/types";
import { formatPrice } from "../lib/format-price";
import { useCartStore } from "@/features/cart/store/cart-store";
import { toast } from "sonner";

type ProductCardGridProps = {
  product: Product;
};

export default function ProductCardGrid({ product }: ProductCardGridProps) {
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
    <article className="group overflow-hidden rounded-[22px] border border-white/10 bg-[#071f2d]/95 p-4 shadow-[0_12px_26px_rgba(0,0,0,0.14)] backdrop-blur-sm transition duration-300 hover:border-cyan-200/14 hover:bg-[#082434]">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[10px] font-medium text-cyan-100">
          {productBadge}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] text-white/75">
          {product.volume}
        </span>
      </div>

      <div className="relative mt-4 flex h-[150px] items-center justify-center rounded-[18px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.018)_0%,rgba(255,255,255,0.01)_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(115,215,255,0.08),transparent_42%)]" />
        <div className="pointer-events-none absolute bottom-4 left-1/2 h-3 w-[90px] -translate-x-1/2 rounded-full bg-white/10 blur-lg" />
        <div className="relative h-[150px] w-[105px]">
          <Image
            src={product.image}
            alt={productTitle}
            fill
            className="object-contain transition duration-500 group-hover:scale-[1.03]"
            sizes="105px"
          />
        </div>
      </div>

      <div className="mt-4 flex min-h-[150px] flex-col">
        <div>
          <h3 className="text-[18px] font-semibold text-white">{productTitle}</h3>
          <p className="mt-1 text-[13px] text-white/65">{productSubtitle}</p>
          <p className="mt-3 line-clamp-2 text-[13px] leading-6 text-white/68">{productDescription}</p>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-3">
            <div className="shrink-0">
              <p className="text-[17px] font-semibold text-white">{formatPrice(product.price)}</p>
              <p className="mt-1 text-[11px] text-white/50">{product.currency} {t("card_per_unit")}</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex h-10 items-center justify-center rounded-2xl border border-cyan-200/20 bg-[linear-gradient(180deg,#15739c_0%,#0a4f70_100%)] px-4 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(10,80,120,0.28)] transition duration-300 hover:border-cyan-100/30 hover:brightness-110"
            >
              {t("card_details")}
            </Link>
            <button
              onClick={handleAddToCart}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-[13px] font-semibold text-white/92 shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition duration-300 hover:border-cyan-200/18 hover:bg-cyan-200/[0.06] hover:text-white"
            >
              <ShoppingBag size={14} />
              {t("card_add_short")}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
